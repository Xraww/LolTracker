import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./Header.scss";

function Header() {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? "active" : "";
    }

    return (
        <header className="header">
            <nav className="header__nav">
                <div className="header__left">
                    <Link to="/" className="header__brand">
                        <span className="header__brand-gg">XRW</span>
                        <span className="header__brand-dot">.</span>
                        <span className="header__brand-tracker">TRACKER</span>
                    </Link>
                </div>

                <div className="header__center">
                    <div className="header__game">
                        <img src="/images/games/lol/logo.png" alt="League of Legends" className="header__game-logo"/>

                        <div className="header__game-menu">
                            <Link to="/lol/player" className={isActive("/lol/player")}>Search Player</Link>
                            <Link to="/lol/leaderboard" className={isActive("/lol/leaderboard")}>Leaderboard</Link>
                            <Link to="/lol/tier-list" className={isActive("/lol/tier-list")}>Champions Tier List</Link>
                            <Link to="/lol/items" className={isActive("/lol/items")}>Items</Link>
                            <Link to="/lol/esports" className={isActive("/lol/esports")}>Esports</Link>
                        </div>
                    </div>

                    <div className="header__game">
                        <img src="/images/games/valorant/Logomark/V_Logomark_Red.png" alt="Valorant" className="header__game-logo header__game-logo--valorant"/>

                        <div className="header__game-menu">
                            <Link to="/valorant/player" className={isActive("/valorant/player")}>Search Player</Link>
                            <Link to="/valorant/leaderboard" className={isActive("/valorant/leaderboard")}>Leaderboard</Link>
                            <Link to="/valorant/agents" className={isActive("/valorant/agents")}>Agents</Link>
                            <Link to="/valorant/weapons" className={isActive("/valorant/weapons")}>Weapons</Link>
                            <Link to="/valorant/esports" className={isActive("/valorant/esports")}>Esports</Link>
                        </div>
                    </div>
                </div>

                <div className="header__right">
                    <button className="header__btn header__btn--discord">Discord</button>
                    <button className="header__btn header__btn--user">
                        <FontAwesomeIcon icon={faUser} />
                    </button>
                </div>
            </nav>
        </header>
    );
}

export default Header;