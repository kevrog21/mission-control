import LogOut from '../components/LogOut'

export default function UserMainDashboard( setUser ) {
    return (
        <div className='page'>
            <LogOut />
            <p className='page-title'>You made it! I am the main user dashboard beep boop bop</p>
        </div>
    )
}