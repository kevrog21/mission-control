import { Link } from 'react-router-dom'

export default function LandingPage() {
    return (
        <div>
            <p className="welcome-message">Landing Page! <Link to="/login">log in</Link> or <Link to="/signup">sign up</Link>.</p>
        </div>
    )
}