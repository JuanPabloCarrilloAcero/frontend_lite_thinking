export default function getRole(): string | null {
    return localStorage.getItem('role');
}