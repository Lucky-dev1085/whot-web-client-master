import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './SignUp.module.sass';
import { UserConsumer } from '../../contexts/UserContext';
import Button from '../../components/Button';
import {
  EmailInput,
  UsernameInput,
  PromoCodeInput,
  TextInput,
  Checkbox,
  isFormValid,
  getFormValues
} from '../../components/FormControls';
import BackArrow from '../../vectors/BackArrow';
import Toast from '../../components/Toast';

class SignUp extends Component {
  state = {
    formFields: {
      eAddress: { value: '', isValid: false },
      name: { value: '', isValid: false },
      password: { value: '', isValid: false },
      passwordConfirm: { value: '', isValid: false },
      promoCode: { value: '', isValid: true },
      termsAgreement: { value: false, isValid: false }
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const {
      eAddress,
      passwordConfirm,
      termsAgreement,
      ...rest
    } = getFormValues(this.state.formFields);

    this.props.signUp({
      email: eAddress,
      ...rest
    });
  };

  onInputChange = (name, value, isValid) => {
    const formFields = {
      ...this.state.formFields,
      [name]: { value, isValid }
    };

    this.setState({ formFields });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    const { signUpError, resetAuthError } = this.props;
    signUpError && resetAuthError();
  }

  render() {
    const { authLoading, signUpError, resetAuthError } = this.props;
    const { formFields } = this.state;
    const {
      eAddress,
      name,
      password,
      passwordConfirm,
      promoCode,
      termsAgreement
    } = formFields;

    const isValidForm = isFormValid(formFields);

    return (
      <section className={styles.container}>
        <header>
          <Link to="/sign-in">
            <BackArrow />
          </Link>
          <h4>SIGN UP</h4>
        </header>

        <div className={styles.formContainer}>
          <form onSubmit={this.onSubmit}>
            <EmailInput
              name="eAddress"
              label="EMAIL ADDRESS"
              value={eAddress.value}
              required={true}
              onChange={this.onInputChange}
              placeholder="Enter your email address"
              validateEmail={true}
              inputTip="Email address cannot be changed after signing up."
            />

            <UsernameInput
              username=""
              name="name"
              label="USERNAME"
              className={styles.username}
              value={name.value}
              required={true}
              onChange={this.onInputChange}
              placeholder="Set your username"
            />

            <TextInput
              type="password"
              name="password"
              label="PASSWORD"
              className={styles.password}
              value={password.value}
              required={true}
              onChange={this.onInputChange}
              placeholder="Set your password"
            />

            <TextInput
              type="password"
              name="passwordConfirm"
              label="CONFIRM PASSWORD"
              className={styles.password}
              value={passwordConfirm.value}
              required={true}
              pattern={password.value}
              onChange={this.onInputChange}
              placeholder="Set your password"
            />

            <PromoCodeInput
              name="promoCode"
              label="PROMO CODE"
              className={styles.promoCode}
              value={promoCode.value}
              onChange={this.onInputChange}
              placeholder="Have a promo code?"
            />

            <Checkbox
              name="termsAgreement"
              checked={termsAgreement.value}
              className={styles.termsAgreement}
              required={true}
              onChange={this.onInputChange}
            >
              I accept to the{' '}
              <Link to="/legal/terms">terms and conditions</Link>
            </Checkbox>

            <div className={styles.formActions}>
              <Button
                disabled={authLoading || !isValidForm}
                theme="secondary"
                size="md"
              >
                CONTINUE
              </Button>

              <div className={styles.signIn}>
                <Link to="/sign-in">Already a User? Sign In!</Link>
              </div>
            </div>
          </form>
        </div>
        {signUpError && (
          <Toast type="error" message={signUpError} close={resetAuthError} />
        )}
      </section>
    );
  }
}

export default UserConsumer(SignUp);
