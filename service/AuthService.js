import { AuthInstance } from './AxiosInstance'
async function signUp(user) {
    try {
        const res = AuthInstance.get(`/users?email=${user.email}`)
        if (res.data.length) {
            throw new Error("Bu e-poct unvaninda hesab artiq movcuddur")
        }
        const newUser = await AuthInstance.post('/users', user)
        return newUser
    } catch (error) {
        console.error('There something gone wrong')
    }
}
export default signUp