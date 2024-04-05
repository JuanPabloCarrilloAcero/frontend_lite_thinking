export default function hasRole(): boolean {

    return !!localStorage.getItem('role');

}