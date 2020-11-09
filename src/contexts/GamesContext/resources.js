import Request from '../../utils/requests';

export const games = new Request('/game-tables');
export const joinGame = new Request('/join-game-table');
export const tournaments = new Request('/tournaments');
export const joinTournament = new Request('/join-tournament');
export const gameInvitation = new Request('/game-table-invitations');
export const gamePlay = new Request('/game-play');
export const playerGames = new Request('/player-games');
export const chatMessages = new Request('/chat-messages');
