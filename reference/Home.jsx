import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faCube, faSquarePollVertical, faList, faChartLine, faTrophy, faChartPie, faUsers } from "@fortawesome/free-solid-svg-icons";
import "./Home.scss";

function Home() {
    return (
        <>
            <div id="home">
                <div className="first-section section-card">
                    <div className="game-box lol">
                        <div className="game-content">
                            <img 
                                src="/images/games/lol/logo.png" 
                                alt="League of Legends" 
                                className="game-logo"
                            />
                            <p>Track your performance, analyze matches, and climb the ranks.</p>
                            <div className="buttons">
                                <button className="primary">Search Player</button>
                                <button className="secondary">Leaderboard</button>
                            </div>
                            <div className="floating-stats">
                                <div className="stat-card">
                                    <FontAwesomeIcon icon={faChartLine}/>
                                    <span>Match History</span>
                                </div>
                                <div className="stat-card">
                                    <FontAwesomeIcon icon={faTrophy}/>
                                    <span>Rankings</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="divider"></div>

                    <div className="game-box valorant">
                        <div className="game-content">
                            <img 
                                src="/images/games/valorant/Logomark/V_Logomark_Red.png" 
                                alt="Valorant" 
                                className="game-logo"
                            />
                            <p>Master your agent performance and track your competitive progress.</p>
                            <div className="buttons">
                                <button className="primary">Search Player</button>
                                <button className="secondary">Leaderboard</button>
                            </div>
                            <div className="floating-stats">
                                <div className="stat-card">
                                    <FontAwesomeIcon icon={faChartPie}/>
                                    <span>Agent Stats</span>
                                </div>
                                <div className="stat-card">
                                    <FontAwesomeIcon icon={faTrophy}/>
                                    <span>Rankings</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="second-section section-card">
                    <div className="left">
                        <span>Explore</span>
                        <h3>Track Your Progress Across Games</h3>
                        <p>Dive into our platform to analyze your performance in both League of Legends and Valorant. Get detailed statistics, competitive rankings, and stay ahead of the meta.</p>

                        <div className="buttons">
                            <button>Compare Players</button>
                            <button>Explore Stats <FontAwesomeIcon icon={faChevronRight}/></button>
                        </div>
                    </div>

                    <div className="right">
                        <div className="feature-grid">
                            <div className="feature-card">
                                <FontAwesomeIcon icon={faChartLine} className="feature-icon"/>
                                <div className="feature-title">Match Analytics</div>
                                <div className="feature-description">Track your performance with detailed match history and statistics</div>
                            </div>

                            <div className="feature-card">
                                <FontAwesomeIcon icon={faTrophy} className="feature-icon"/>
                                <div className="feature-title">Competitive Rankings</div>
                                <div className="feature-description">Compare yourself with top players and track your rank progression</div>
                            </div>

                            <div className="feature-card">
                                <FontAwesomeIcon icon={faChartPie} className="feature-icon"/>
                                <div className="feature-title">Game Stats</div>
                                <div className="feature-description">Champions and Agents statistics with win rates and trends</div>
                            </div>

                            <div className="feature-card">
                                <FontAwesomeIcon icon={faUsers} className="feature-icon"/>
                                <div className="feature-title">Pro Scene</div>
                                <div className="feature-description">Follow professional matches and player performances</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="third-section section-card">
                    <div className="content-wrapper">
                        <div className="head">
                            <span>Statistics</span>
                            <h4>In-Depth Gaming Analytics</h4>
                            <p>Access comprehensive statistics for both League of Legends and Valorant to enhance your competitive gameplay.</p>
                        </div>

                        <div className="stats-grid">
                            <div className="stat-card">
                                <FontAwesomeIcon icon={faSquarePollVertical} className="stat-icon"/>
                                <div className="stat-content">
                                    <h5>Performance Tracking</h5>
                                    <p>Real-time match analysis and detailed performance metrics for both games</p>
                                </div>
                            </div>

                            <div className="stat-card featured">
                                <FontAwesomeIcon icon={faTrophy} className="stat-icon"/>
                                <div className="stat-content">
                                    <div className="featured-tag">Popular</div>
                                    <h5>Rank Progress</h5>
                                    <p>Track your competitive journey from Iron to Radiant or Challenger</p>
                                </div>
                            </div>

                            <div className="stat-card">
                                <FontAwesomeIcon icon={faChartPie} className="stat-icon"/>
                                <div className="stat-content">
                                    <h5>Gameplay Analysis</h5>
                                    <p>Deep insights into your Champion and Agent performance</p>
                                </div>
                            </div>
                        </div>

                        <div className="cta">
                            <button className="primary">Start Tracking</button>
                            <button className="secondary">View Leaderboards <FontAwesomeIcon icon={faChevronRight}/></button>
                        </div>
                    </div>
                    
                    <div className="particles"></div>
                </div>

                <div className="fourth-section section-card">
                    <div className="stats-showcase">
                        <div className="stats-box">
                            <div className="stats-header">
                                <FontAwesomeIcon icon={faChartLine} className="icon"/>
                                <h3>Track Your Journey</h3>
                            </div>
                            <div className="stats-content">
                                <div className="stat-item">
                                    <FontAwesomeIcon icon={faTrophy} />
                                    <span>10M+</span>
                                    <p>Players Tracked</p>
                                </div>
                                <div className="stat-item">
                                    <FontAwesomeIcon icon={faChartPie} />
                                    <span>50M+</span>
                                    <p>Matches Analyzed</p>
                                </div>
                                <div className="stat-item">
                                    <FontAwesomeIcon icon={faUsers} />
                                    <span>100K+</span>
                                    <p>Daily Users</p>
                                </div>
                                <div className="stat-item">
                                    <FontAwesomeIcon icon={faChartLine} />
                                    <span>1B+</span>
                                    <p>Stats Recorded</p>
                                </div>
                                <div className="stat-item">
                                    <FontAwesomeIcon icon={faSquarePollVertical} />
                                    <span>2M+</span>
                                    <p>Profiles Created</p>
                                </div>
                                <div className="stat-item">
                                    <FontAwesomeIcon icon={faCube} />
                                    <span>24/7</span>
                                    <p>Live Tracking</p>
                                </div>
                            </div>
                        </div>

                        <div className="features-list">
                            <div className="feature-item">
                                <div className="feature-icon">
                                    <FontAwesomeIcon icon={faChartLine} />
                                </div>
                                <div className="feature-text">
                                    <h4>Real-time Stats</h4>
                                    <p>Track your performance as you play with instant updates and detailed analytics</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon">
                                    <FontAwesomeIcon icon={faSquarePollVertical} />
                                </div>
                                <div className="feature-text">
                                    <h4>Global Rankings</h4>
                                    <p>Compare yourself with players worldwide and track your progress</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon">
                                    <FontAwesomeIcon icon={faChartPie} />
                                </div>
                                <div className="feature-text">
                                    <h4>Detailed Analysis</h4>
                                    <p>Get insights into your gameplay with comprehensive statistics</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="fifth-section section-card">
                    <section className="text">
                        <h6>Join our League of Legends Community</h6>
                        <p>Connect with fellow players, share strategies, and stay ahead of the curve with our comprehensive tools and insights.</p>
                    </section>

                    <div className="buttons">
                        <button>Join the discord</button>
                        <button>Sign Up <FontAwesomeIcon icon={faChevronRight}/></button>
                    </div>
                </div>

                <footer className="footer">
                    <div className="footer-content">
                        <div className="footer-section">
                            <h4>About Us</h4>
                            <p>Providing the best gaming statistics and analysis for League of Legends and Valorant players.</p>
                        </div>
                        
                        <div className="footer-section">
                            <h4>League of Legends</h4>

                            <ul>
                                <li>Search Player</li>
                                <li>Leaderboard</li>
                                <li>Pro Matches</li>
                            </ul>
                        </div>
                        
                        <div className="footer-section">
                            <h4>Valorant</h4>

                            <ul>
                                <li>Search Player</li>
                                <li>Leaderboard</li>
                                <li>Pro Matches</li>
                            </ul>
                        </div>
                        
                        <div className="footer-section">
                            <h4>Socials</h4>

                            <ul>
                                <li>Discord</li>
                                <li>Twitter</li>
                                <li>Contact Us</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="footer-bottom">
                        <p>© 2025 Xraww. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Home;