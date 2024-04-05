export default function hasToken(): boolean {

    return !!localStorage.getItem('token');

}