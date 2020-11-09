import React, { Component } from 'react';

import {
  users,
  signIn,
  passwordReset,
  playerDetails,
  playerVerification,
  playerBankAccounts,
  playerBankAccountsVerification,
  accountFunding,
  accountWithdrawals
} from './resources';
import { getRequestError } from '../../utils/requests';

const UserContext = React.createContext();
class UserProvider extends Component {
  constructor() {
    super();

    this.state = {
      user: this.getInitialUser(),
      playerBankAccounts: []
    };
  }

  getInitialUser = () => {
    let user = null;

    try {
      user = JSON.parse(localStorage.getItem('user'));
    } catch (error) {
      return null;
    }

    return user;
  };

  signUp = userData => {
    this.resetAuthError();
    this.setState({ authLoading: true });

    users
      .post(userData)
      .then(({ data }) => {
        this.signIn({
          email: data.email,
          password: userData.password
        });
      })
      .catch(error => {
        this.setState({
          signUpError: getRequestError(error),
          authLoading: false
        });
      });
  };

  signIn = (userData, callback) => {
    this.resetAuthError();
    this.setState({ authLoading: true });

    signIn
      .post(userData)
      .then(({ data }) => {
        const { permissions } = data.user;
        if (
          permissions.length &&
          (permissions.includes('*') || permissions.includes('admin-app:read'))
        ) {
          this.setState({
            signInError: `This account doesn't exist.`,
            authLoading: false
          });

          return;
        }

        this.saveUser(data);
        callback && callback();
        this.setState({ authLoading: false }, this.getBankAccounts);
      })
      .catch(error => {
        this.setState({
          signInError: getRequestError(error),
          authLoading: false
        });
      });
  };

  saveUser = data => {
    const { jwt, user } = data;

    localStorage.setItem('jwt', jwt);
    localStorage.setItem('user', JSON.stringify(user));

    this.setState({ user });
  };

  initiatePasswordReset = email => {
    this.resetAuthError();
    this.resetAuthSuccess();
    this.setState({ authLoading: true });

    passwordReset
      .get({ email })
      .then(() => {
        this.setState({
          authLoading: false,
          passwordResetSuccess: true
        });
      })
      .catch(error => {
        this.setState({
          passwordResetError: getRequestError(error),
          authLoading: false
        });
      });
  };

  resetPassword = userData => {
    this.resetAuthError();
    this.setState({ authLoading: true });

    passwordReset
      .post(userData)
      .then(({ data }) => {
        this.saveUser(data);
        this.setState({ authLoading: false });
      })
      .catch(error => {
        this.setState({
          passwordResetError: getRequestError(error),
          authLoading: false
        });
      });
  };

  getProfile = () => {
    playerDetails
      .getById(this.state.user.playerDetail.id)
      .then(({ data }) => {
        const { user } = this.state;
        user.playerDetail = data;

        this.setState({ user });
        localStorage.setItem('user', JSON.stringify(user));
      })
      .catch(error => {});
  };

  updateProfile = (userData, isResetOtp) => {
    this.resetAuthError();
    this.resetAuthSuccess();
    this.setState({ authLoading: true });
    const shouldRequestForOtp = Boolean(userData.mobile);

    playerDetails
      .patchById(this.state.user.playerDetail.id, userData)
      .then(({ data }) => {
        const { user } = this.state;
        user.playerDetail = data;

        this.setState({
          isResetOtp,
          user,
          profileSuccess: isResetOtp || !shouldRequestForOtp,
          authLoading: false,
          openMobileOtp: shouldRequestForOtp
        });

        localStorage.setItem('user', JSON.stringify(user));
      })
      .catch(error => {
        this.setState({
          profileError: getRequestError(error),
          authLoading: false
        });
      });
  };

  verifyProfile = code => {
    this.resetAuthError();
    this.resetAuthSuccess();
    this.setState({ authLoading: true });
    const { token } = this.state.user.playerDetail;

    playerVerification
      .post({ code, token })
      .then(({ data }) => {
        const user = { ...this.state.user };
        user.playerDetail.mobileVerificationTimestamp =
          data.mobileVerificationTimestamp;

        this.setState({
          user,
          authLoading: false,
          profileSuccess: true,
          openMobileOtp: false
        });

        localStorage.setItem('user', JSON.stringify(user));
      })
      .catch(error => {
        this.setState({
          profileError: getRequestError(error),
          authLoading: false
        });
      });
  };

  updateUser = userData => {
    this.resetAuthError();
    this.resetAuthSuccess();
    this.setState({ authLoading: true });

    users
      .patchById(this.state.user.id, userData)
      .then(() => {
        this.setState({
          profileSuccess: true,
          authLoading: false
        });
      })
      .catch(error => {
        this.setState({
          profileError: getRequestError(error),
          authLoading: false
        });
      });
  };

  deleteUser = () => {
    this.resetAuthError();
    this.setState({ authLoading: true });

    users
      .deleteById(this.state.user.id)
      .then(() => {
        this.setState({
          authLoading: false
        });

        this.logout();
      })
      .catch(error => {});
  };

  closeMobileOtp = () => {
    this.setState({ openMobileOtp: false });
  };

  getBankAccounts = () => {
    this.setState({ playerBankAccountsLoading: true });

    playerBankAccounts
      .get({ 'verifiedAt[$ne]': 'null' }, true)
      .then(({ data }) => {
        this.setState({
          playerBankAccounts: data.data,
          playerBankAccountsLoading: false
        });
      })
      .catch(error => {
        this.setState({ playerBankAccountsLoading: false });
      });
  };

  addBankAccount = bankData => {
    this.resetAuthError();
    this.resetAuthSuccess();
    this.setState({ authLoading: true });
    const { resetBankOtpData } = this.state;

    playerBankAccounts
      .post(bankData, true)
      .then(({ data }) => {
        const { token } = data;
        if (!token) {
          this.setState({
            bankAccountSuccess: true,
            authLoading: false
          });
          return this.getBankAccounts();
        }
        if (resetBankOtpData) {
          this.setState({
            resendBankOtpSuccess: true,
            authLoading: false,
            bankToken: token
          });
        } else {
          this.setState({
            resetBankOtpData: bankData,
            authLoading: false,
            bankToken: token,
            openBankOtp: Boolean(token)
          });
        }
      })
      .catch(error => {
        this.setState({
          bankAccountError: getRequestError(error),
          authLoading: false
        });
      });
  };

  verifyBank = code => {
    this.resetAuthError();
    this.resetAuthSuccess();
    this.setState({ authLoading: true });

    playerBankAccountsVerification
      .post({ code, token: this.state.bankToken })
      .then(() => {
        this.setState({
          authLoading: false,
          bankAccountSuccess: true,
          bankToken: null,
          openBankOtp: true,
          resetBankOtpData: null
        });
        this.getBankAccounts();
      })
      .catch(error => {
        this.setState({
          bankAccountError: getRequestError(error),
          authLoading: false
        });
      });
  };

  closeBankOtp = () => {
    this.setState({
      bankToken: null,
      openBankOtp: false,
      resetBankOtpData: null
    });
  };

  deleteBankAccount = id => {
    this.resetAuthError();
    this.setState({ authLoading: true });

    playerBankAccounts
      .deleteById(id)
      .then(() => {
        this.setState({
          authLoading: false
        });
        this.getBankAccounts();
      })
      .catch(error => {
        this.setState({
          bankAccountError: getRequestError(error),
          authLoading: false
        });
      });
  };

  fundAccount = data => {
    this.resetAuthError();
    this.resetAuthSuccess();
    this.setState({ authLoading: true });

    accountFunding
      .post(data, true)
      .then(() => {
        this.getProfile();
        this.setState({
          authLoading: false,
          accountFundingSuccess: true
        });
      })
      .catch(error => {
        this.setState({
          accountFundingError: getRequestError(error),
          authLoading: false
        });
      });
  };

  transferToBankAccount = data => {
    this.resetAuthError();
    this.resetAuthSuccess();
    this.setState({ authLoading: true });

    accountWithdrawals
      .post(data, true)
      .then(({ data }) => {
        this.getProfile();
        this.setState({
          authLoading: false,
          accountWithdrawalSuccess: true
        });
      })
      .catch(error => {
        this.setState({
          accountWithdrawalError: getRequestError(error),
          authLoading: false
        });
      });
  };

  logout = () => {
    this.setState({
      user: null,
      playerBankAccounts: []
    });

    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
  };

  resetAuthSuccess = () => {
    this.setState({
      passwordResetSuccess: false,
      profileSuccess: false,
      bankAccountSuccess: false,
      resendBankOtpSuccess: false,
      accountFundingSuccess: false,
      accountWithdrawalSuccess: false
    });
  };

  resetAuthError = () => {
    this.setState({
      signUpError: null,
      signInError: null,
      passwordResetError: null,
      profileError: null,
      bankAccountError: null,
      accountFundingError: null,
      accountWithdrawalError: null
    });
  };

  componentDidMount() {
    if (this.state.user) {
      this.getProfile();
      this.getBankAccounts();
    }
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          signUp: this.signUp,
          signIn: this.signIn,
          initiatePasswordReset: this.initiatePasswordReset,
          resetPassword: this.resetPassword,
          getProfile: this.getProfile,
          updateProfile: this.updateProfile,
          verifyProfile: this.verifyProfile,
          closeMobileOtp: this.closeMobileOtp,
          updateUser: this.updateUser,
          deleteUser: this.deleteUser,
          addBankAccount: this.addBankAccount,
          verifyBank: this.verifyBank,
          closeBankOtp: this.closeBankOtp,
          deleteBankAccount: this.deleteBankAccount,
          fundAccount: this.fundAccount,
          transferToBankAccount: this.transferToBankAccount,
          resetAuthSuccess: this.resetAuthSuccess,
          resetAuthError: this.resetAuthError,
          logout: this.logout
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

const UserConsumer = Component => {
  return class Consumer extends React.Component {
    render() {
      return (
        <UserContext.Consumer>
          {data => <Component {...this.props} {...data} />}
        </UserContext.Consumer>
      );
    }
  };
};

export default UserContext;
export { UserProvider, UserConsumer };
