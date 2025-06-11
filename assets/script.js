// Global variables
let userData = {
    name: 'Sarah Johnson',
    avatar: '👩‍💼',
    totalPoints: 1950,
    globalRank: 3,
    currentStreak: 15,
    todaySteps: 8247,
    targetSteps: 10000,
    calories: 420,
    workouts: 2,
    water: 6,
    heartRate: 72
};

let challengesData = [];
let usersData = [];
let leaderboardData = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadData();
    setupEventListeners();
    updateDashboard();
});

// Initialize application
function initializeApp() {
    console.log('FitChallenge App Initialized');
    
    // Check if we're on mobile and setup mobile menu
    setupMobileMenu();
    
    // Setup tab functionality for profile page
    if (document.querySelector('.tab-nav')) {
        setupProfileTabs();
    }
    
    // Load user data from localStorage if available
    loadUserData();
}

// Setup mobile menu functionality
function setupMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on nav links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
}

// Setup profile tabs
function setupProfileTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Load data from JSON files or localStorage
async function loadData() {
    try {
        // Load challenges data
        challengesData = await loadChallengesData();
        
        // Load users data
        usersData = await loadUsersData();
        
        // Generate leaderboard data
        leaderboardData = generateLeaderboardData();
        
        // Update UI with loaded data
        updateChallengesUI();
        updateLeaderboardUI();
        updateFriendsUI();
        updateActivityFeed();
        
    } catch (error) {
        console.error('Error loading data:', error);
        // Use fallback data if loading fails
        useFallbackData();
    }
}

// Load challenges data (simulated)
async function loadChallengesData() {
    // Simulated challenges data
    return [
        {
            id: 1,
            name: "30-Day Step Challenge",
            description: "Walk 10,000 steps daily for 30 days",
            type: "steps",
            duration: 30,
            participants: 24,
            daysLeft: 12,
            progress: 68,
            prize: "Winner gets $50 gift card",
            icon: "🚶‍♀️",
            color: "blue",
            status: "active"
        },
        {
            id: 2,
            name: "Weekend Warrior",
            description: "Complete 3 workouts this weekend",
            type: "workout",
            duration: 2,
            participants: 8,
            daysLeft: 2,
            progress: 33,
            prize: "Glory and bragging rights",
            icon: "⚡",
            color: "red",
            status: "active"
        },
        {
            id: 3,
            name: "Hydration Hero",
            description: "Drink 8 glasses of water daily",
            type: "hydration",
            duration: 7,
            participants: 16,
            daysLeft: 5,
            progress: 75,
            prize: "Smart water bottle",
            icon: "💧",
            color: "cyan",
            status: "active"
        },
        {
            id: 4,
            name: "Heart Rate Zone",
            description: "Maintain target heart rate for 30 min daily",
            type: "cardio",
            duration: 14,
            participants: 15,
            startsIn: 3,
            prize: "Fitness tracker upgrade",
            icon: "❤️",
            color: "pink",
            status: "upcoming"
        },
        {
            id: 5,
            name: "Meditation March",
            description: "10 minutes of meditation daily",
            type: "mindfulness",
            duration: 30,
            participants: 31,
            startsIn: 7,
            prize: "Premium meditation app subscription",
            icon: "🧘‍♀️",
            color: "purple",
            status: "upcoming"
        }
    ];
}

// Load users data (simulated)
async function loadUsersData() {
    return [
        {
            id: 1,
            name: 'Mike Johnson',
            avatar: '👨‍💻',
            status: 'online',
            currentChallenge: '30-Day Step Challenge',
            streak: 23,
            todaySteps: 8920,
            totalSteps: 345240,
            rank: 1,
            points: 2450,
            badges: ['🔥', '👟', '🏆'],
            progress: 98
        },
        {
            id: 2,
            name: 'Emma Wilson',
            avatar: '👩‍🦰',
            status: 'offline',
            currentChallenge: 'Weekend Warrior',
            streak: 18,
            todaySteps: 7540,
            totalSteps: 332180,
            rank: 2,
            points: 2280,
            badges: ['💪', '⚡', '🎯'],
            progress: 94
        },
        {
            id: 3,
            name: 'Sarah Johnson',
            avatar: '👩‍💼',
            status: 'online',
            currentChallenge: '30-Day Step Challenge',
            streak: 15,
            todaySteps: 8247,
            totalSteps: 298650,
            rank: 3,
            points: 1950,
            badges: ['🔥', '👟', '🦋'],
            progress: 85,
            isCurrentUser: true
        },
        {
            id: 4,
            name: 'David Chen',
            avatar: '👨‍🎓',
            status: 'online',
            currentChallenge: '30-Day Step Challenge',
            streak: 12,
            todaySteps: 6780,
            totalSteps: 287420,
            rank: 4,
            points: 1820,
            badges: ['📚', '🧠', '💡'],
            progress: 82
        },
        {
            id: 5,
            name: 'Lisa Garcia',
            avatar: '👩‍🏫',
            status: 'online',
            currentChallenge: 'Hydration Station',
            streak: 20,
            todaySteps: 9200,
            totalSteps: 275890,
            rank: 5,
            points: 1650,
            badges: ['💧', '🌟', '🎨'],
            progress: 78
        }
    ];
}

// Generate leaderboard data
function generateLeaderboardData() {
    return usersData.sort((a, b) => b.points - a.points);
}

// Use fallback data if loading fails
function useFallbackData() {
    console.log('Using fallback data');
    challengesData = [];
    usersData = [];
    leaderboardData = [];
}

// Setup event listeners
function setupEventListeners() {
    // Create challenge modal
    const createChallengeBtn = document.getElementById('createChallengeBtn');
    const createChallengeModal = document.getElementById('createChallengeModal');
    const closeModal = document.getElementById('closeModal');
    const cancelCreate = document.getElementById('cancelCreate');
    const createChallengeForm = document.getElementById('createChallengeForm');
    
    if (createChallengeBtn && createChallengeModal) {
        createChallengeBtn.addEventListener('click', function() {
            createChallengeModal.classList.add('active');
        });
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            createChallengeModal.classList.remove('active');
        });
    }
    
    if (cancelCreate) {
        cancelCreate.addEventListener('click', function() {
            createChallengeModal.classList.remove('active');
        });
    }
    
    if (createChallengeForm) {
        createChallengeForm.addEventListener('submit', handleCreateChallenge);
    }
    
    // Challenge selector
    const challengeSelector = document.getElementById('challengeSelector');
    if (challengeSelector) {
        challengeSelector.addEventListener('change', function() {
            updateLeaderboardForChallenge(this.value);
        });
    }
    
    // Notification button
    const notificationBtn = document.getElementById('notificationBtn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            showNotifications();
        });
    }
    
    // Close modal when clicking outside
    if (createChallengeModal) {
        createChallengeModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    }
}

// Update dashboard with current data
function updateDashboard() {
    // Update today's steps
    const stepsElement = document.getElementById('todaySteps');
    if (stepsElement) {
        stepsElement.textContent = userData.todaySteps.toLocaleString();
    }
    
    const stepsCountElement = document.getElementById('stepsCount');
    if (stepsCountElement) {
        stepsCountElement.textContent = userData.todaySteps.toLocaleString();
    }
    
    // Update weekly progress
    updateWeeklyProgress();
}

// Update weekly progress chart
function updateWeeklyProgress() {
    const weeklyProgressContainer = document.getElementById('weeklyProgress');
    if (!weeklyProgressContainer) return;
    
    const weeklyData = [
        { day: 'Mon', steps: 8500, target: 10000, completed: true },
        { day: 'Tue', steps: 9200, target: 10000, completed: true },
        { day: 'Wed', steps: 7800, target: 10000, completed: false },
        { day: 'Thu', steps: 11200, target: 10000, completed: true },
        { day: 'Fri', steps: 8247, target: 10000, completed: false },
        { day: 'Sat', steps: 0, target: 10000, completed: false },
        { day: 'Sun', steps: 0, target: 10000, completed: false }
    ];
    
    weeklyProgressContainer.innerHTML = weeklyData.map(day => {
        const percentage = Math.min((day.steps / day.target) * 100, 100);
        const progressClass = day.completed ? 'completed' : day.steps > 0 ? 'partial' : 'empty';
        
        return `
            <div class="week-day">
                <div class="day-label">${day.day}</div>
                <div class="day-progress">
                    <div class="day-progress-fill ${progressClass}" style="width: ${percentage}%"></div>
                </div>
                <div class="day-steps">${day.steps > 0 ? day.steps.toLocaleString() : '-'}</div>
                ${day.completed ? '<div class="day-check">✓</div>' : ''}
            </div>
        `;
    }).join('');
}

// Update challenges UI
function updateChallengesUI() {
    updateActiveChallenges();
    updateAvailableChallenges();
}

// Update active challenges
function updateActiveChallenges() {
    const activeChallengesContainer = document.getElementById('activeChallenges');
    if (!activeChallengesContainer) return;
    
    const activeChallenges = challengesData.filter(challenge => challenge.status === 'active');
    
    activeChallengesContainer.innerHTML = activeChallenges.map(challenge => {
        return createChallengeCard(challenge, true);
    }).join('');
}

// Update available challenges
function updateAvailableChallenges() {
    const availableChallengesContainer = document.getElementById('availableChallenges');
    if (!availableChallengesContainer) return;
    
    const availableChallenges = challengesData.filter(challenge => challenge.status === 'upcoming');
    
    availableChallengesContainer.innerHTML = availableChallenges.map(challenge => {
        return createChallengeCard(challenge, false);
    }).join('');
}

// Create challenge card HTML
function createChallengeCard(challenge, isActive) {
    const colorClasses = {
        blue: 'stat-card-blue',
        red: 'stat-card-red',
        purple: 'stat-card-purple',
        cyan: 'stat-card-cyan',
        pink: 'stat-card-pink',
        green: 'stat-card-green'
    };
    
    const colorClass = colorClasses[challenge.color] || 'stat-card-blue';
    
    if (isActive) {
        return `
            <div class="challenge-item">
                <div class="challenge-header">
                    <div class="challenge-icon ${colorClass.replace('stat-card', 'bg')}">${challenge.icon}</div>
                    <span class="status-badge status-active">Active</span>
                </div>
                <div class="challenge-content">
                    <h3 class="challenge-name">${challenge.name}</h3>
                    <p class="challenge-info">${challenge.description}</p>
                    
                    <div class="progress-section">
                        <div class="progress-header">
                            <span class="progress-label">Progress</span>
                            <span class="progress-value">${challenge.progress}%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${challenge.progress}%"></div>
                        </div>
                    </div>
                    
                    <div class="challenge-meta">
                        <div class="challenge-participants">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="m19 8 2 2-2 2"></path>
                                <path d="m21 10-7.5 0"></path>
                            </svg>
                            <span>${challenge.participants} participants</span>
                        </div>
                        <div class="challenge-time">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12,6 12,12 16,14"></polyline>
                            </svg>
                            <span>${challenge.daysLeft} days left</span>
                        </div>
                    </div>
                    
                    <div class="challenge-prize">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                            <path d="M14 9h1.5a2.5 2.5 0 0 1 0 5H14"></path>
                            <path d="m6 9 3 3 3-3"></path>
                        </svg>
                        <span>${challenge.prize}</span>
                    </div>
                    
                    <button class="challenge-action btn-primary">View Details</button>
                </div>
            </div>
        `;
    } else {
        return `
            <div class="challenge-item">
                <div class="challenge-header">
                    <div class="challenge-icon ${colorClass.replace('stat-card', 'bg')}">${challenge.icon}</div>
                    <span class="status-badge" style="background: var(--gradient-info); color: white;">Open</span>
                </div>
                <div class="challenge-content">
                    <h3 class="challenge-name">${challenge.name}</h3>
                    <p class="challenge-info">${challenge.description}</p>
                    
                    <div class="challenge-meta">
                        <div class="challenge-participants">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="m19 8 2 2-2 2"></path>
                                <path d="m21 10-7.5 0"></path>
                            </svg>
                            <span>${challenge.participants} joined</span>
                        </div>
                        <div class="challenge-time">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                                <path d="M16 2v4M8 2v4M3 10h18"></path>
                            </svg>
                            <span>Starts in ${challenge.startsIn} days</span>
                        </div>
                    </div>
                    
                    <div class="challenge-prize">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                            <path d="M14 9h1.5a2.5 2.5 0 0 1 0 5H14"></path>
                            <path d="m6 9 3 3 3-3"></path>
                        </svg>
                        <span>${challenge.prize}</span>
                    </div>
                    
                    <button class="challenge-action btn-primary" onclick="joinChallenge(${challenge.id})">Join Challenge</button>
                </div>
            </div>
        `;
    }
}

// Update leaderboard UI
function updateLeaderboardUI() {
    const leaderboardContainer = document.getElementById('leaderboardList');
    if (!leaderboardContainer) return;
    
    leaderboardContainer.innerHTML = leaderboardData.map(user => {
        const rankIcon = getRankIcon(user.rank);
        const changeIcon = getChangeIcon(user.rank <= 3 ? 'up' : 'same');
        
        return `
            <div class="leaderboard-entry ${user.isCurrentUser ? 'current-user' : ''}">
                <div class="entry-rank">
                    ${rankIcon}
                </div>
                <div class="entry-avatar">${user.avatar}</div>
                <div class="entry-info">
                    <div class="entry-name">
                        <h4>${user.name}</h4>
                        ${user.isCurrentUser ? '<span class="user-badge">You</span>' : ''}
                    </div>
                    <div class="entry-score">${user.totalSteps.toLocaleString()} steps</div>
                    <div class="entry-points">${user.points} points</div>
                </div>
                <div class="entry-stats">
                    <div class="entry-progress">${user.progress}%</div>
                    <div class="entry-streak">${user.streak} day streak</div>
                </div>
                <div class="entry-change">
                    ${changeIcon}
                </div>
            </div>
        `;
    }).join('');
}

// Get rank icon HTML
function getRankIcon(rank) {
    switch (rank) {
        case 1:
            return '<svg class="rank-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: #fbbf24;"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M14 9h1.5a2.5 2.5 0 0 1 0 5H14"></path><path d="m6 9 3 3 3-3"></path></svg>';
        case 2:
            return '<svg class="rank-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: #9ca3af;"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>';
        case 3:
            return '<svg class="rank-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: #d97706;"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M14 9h1.5a2.5 2.5 0 0 1 0 5H14"></path><path d="m6 9 3 3 3-3"></path></svg>';
        default:
            return `<span class="rank-number">#${rank}</span>`;
    }
}

// Get change icon HTML
function getChangeIcon(change) {
    if (change === 'up') {
        return '<svg class="entry-change" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--neon-green);"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18"></polyline><polyline points="17,6 23,6 23,12"></polyline></svg>';
    } else if (change === 'down') {
        return '<svg class="entry-change" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--vibrant-red); transform: rotate(180deg);"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18"></polyline><polyline points="17,6 23,6 23,12"></polyline></svg>';
    }
    return '<div class="entry-change"></div>';
}

// Update friends UI
function updateFriendsUI() {
    const friendsContainer = document.getElementById('friendsList');
    if (!friendsContainer) return;
    
    const friends = usersData.filter(user => !user.isCurrentUser);
    
    friendsContainer.innerHTML = friends.map(friend => {
        return `
            <div class="friend-card">
                <div class="friend-header">
                    <div class="friend-info">
                        <div class="friend-avatar">
                            ${friend.avatar}
                            <div class="friend-status ${friend.status}"></div>
                        </div>
                        <div class="friend-details">
                            <h4>${friend.name}</h4>
                            <div class="friend-rank">Rank #${friend.rank}</div>
                            <div class="friend-points">${friend.points} points</div>
                        </div>
                    </div>
                    <div class="friend-actions">
                        <button class="btn-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                        </button>
                        <button class="btn-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                                <polyline points="16,6 12,2 8,6"></polyline>
                                <line x1="12" x2="12" y1="2" y2="15"></line>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="friend-stats">
                    <div class="friend-stat">
                        <span class="friend-stat-label">Current Challenge</span>
                        <span class="friend-stat-value">${friend.currentChallenge}</span>
                    </div>
                    <div class="friend-stat">
                        <span class="friend-stat-label">Today's Steps</span>
                        <span class="friend-stat-value">${friend.todaySteps.toLocaleString()}</span>
                    </div>
                    <div class="friend-stat">
                        <span class="friend-stat-label">Streak</span>
                        <span class="friend-stat-value">${friend.streak} days</span>
                    </div>
                </div>
                <div class="friend-badges">
                    <span class="friend-badges-label">Badges</span>
                    <div class="friend-badges-list">
                        ${friend.badges.map(badge => `<span class="friend-badge">${badge}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Update activity feed
function updateActivityFeed() {
    const activityContainer = document.getElementById('activityFeed');
    if (!activityContainer) return;
    
    const activities = [
        {
            id: 1,
            user: 'Mike Johnson',
            avatar: '👨‍💻',
            action: 'completed',
            target: '10,000 steps',
            time: '2 hours ago',
            type: 'achievement'
        },
        {
            id: 2,
            user: 'Emma Wilson',
            avatar: '👩‍🦰',
            action: 'joined',
            target: 'Weekend Warrior challenge',
            time: '4 hours ago',
            type: 'challenge'
        },
        {
            id: 3,
            user: 'Lisa Garcia',
            avatar: '👩‍🏫',
            action: 'achieved',
            target: '7-day streak',
            time: '6 hours ago',
            type: 'streak'
        },
        {
            id: 4,
            user: 'David Chen',
            avatar: '👨‍🎓',
            action: 'earned',
            target: 'Consistency Badge',
            time: '8 hours ago',
            type: 'badge'
        }
    ];
    
    activityContainer.innerHTML = activities.map(activity => {
        return `
            <div class="activity-item">
                <div class="activity-content">
                    <div class="activity-avatar">${activity.avatar}</div>
                    <div class="activity-details">
                        <div class="activity-text">
                            <span class="activity-user">${activity.user}</span> ${activity.action} 
                            <span class="activity-target">${activity.target}</span>
                        </div>
                        <div class="activity-time">${activity.time}</div>
                    </div>
                    <div class="activity-actions">
                        <button class="btn-icon">❤️</button>
                        <button class="btn-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Handle create challenge form submission
function handleCreateChallenge(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const challengeData = {
        id: Date.now(),
        name: formData.get('name') || e.target.querySelector('input[type="text"]').value,
        description: formData.get('description') || e.target.querySelector('textarea').value,
        duration: parseInt(formData.get('duration') || e.target.querySelector('input[type="number"]').value),
        type: formData.get('type') || e.target.querySelector('select').value,
        prize: formData.get('prize') || e.target.querySelectorAll('input[type="text"]')[1].value,
        participants: 1,
        status: 'upcoming',
        startsIn: 1,
        icon: getIconForType(formData.get('type') || e.target.querySelector('select').value),
        color: getColorForType(formData.get('type') || e.target.querySelector('select').value)
    };
    
    // Add to challenges data
    challengesData.push(challengeData);
    
    // Update UI
    updateChallengesUI();
    
    // Close modal
    document.getElementById('createChallengeModal').classList.remove('active');
    
    // Reset form
    e.target.reset();
    
    // Show success message
    showNotification('Challenge created successfully!', 'success');
}

// Get icon for challenge type
function getIconForType(type) {
    const icons = {
        steps: '🚶‍♀️',
        workout: '⚡',
        hydration: '💧',
        sleep: '😴',
        mindfulness: '🧘‍♀️',
        cardio: '❤️'
    };
    return icons[type] || '🎯';
}

// Get color for challenge type
function getColorForType(type) {
    const colors = {
        steps: 'blue',
        workout: 'red',
        hydration: 'cyan',
        sleep: 'purple',
        mindfulness: 'green',
        cardio: 'pink'
    };
    return colors[type] || 'blue';
}

// Join challenge function
function joinChallenge(challengeId) {
    const challenge = challengesData.find(c => c.id === challengeId);
    if (challenge) {
        challenge.participants += 1;
        updateChallengesUI();
        showNotification(`Successfully joined ${challenge.name}!`, 'success');
    }
}

// Update leaderboard for specific challenge
function updateLeaderboardForChallenge(challengeId) {
    // This would filter leaderboard data based on the selected challenge
    // For now, we'll just update the display
    updateLeaderboardUI();
}

// Show notifications
function showNotifications() {
    const notifications = [
        'Mike Johnson completed 10,000 steps!',
        'New challenge "Summer Fitness" starts tomorrow',
        'You earned a new badge: Week Warrior!'
    ];
    
    alert(notifications.join('\n'));
}

// Show notification message
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '0.5rem',
        color: 'white',
        fontWeight: '600',
        zIndex: '1000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease-in-out'
    });
    
    // Set background color based on type
    const colors = {
        success: '#22c55e',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    notification.style.background = colors[type] || colors.info;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Load user data from localStorage
function loadUserData() {
    const savedData = localStorage.getItem('fitChallengeUserData');
    if (savedData) {
        try {
            const parsedData = JSON.parse(savedData);
            userData = { ...userData, ...parsedData };
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    }
}

// Save user data to localStorage
function saveUserData() {
    try {
        localStorage.setItem('fitChallengeUserData', JSON.stringify(userData));
    } catch (error) {
        console.error('Error saving user data:', error);
    }
}

// Update user stats (simulated)
function updateUserStats(newStats) {
    userData = { ...userData, ...newStats };
    saveUserData();
    updateDashboard();
}

// Simulate fitness data updates
function simulateFitnessDataUpdate() {
    // This would integrate with fitness API Fitbit
    function getAuthCodeFromURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get('code'); // Extract authorization code
    }

    function requestAccessToken(authCode) {
        fetch('https://api.fitbit.com/oauth2/token', {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa('23QKCX:1846b2785a1fb7a504bfdf3b7e77b621'),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                code: authCode, // Retrieved from URL
                grant_type: 'authorization_code',
                redirect_uri: 'https://dandrichest.github.io/fitness-challenge/profile.html'
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Access Token:', data.access_token);
            localStorage.setItem('fitbitAccessToken', data.access_token); // Store token
        })
        .catch(error => console.error('Error getting access token:', error));
    }
    
    // Call function with extracted auth code
    const authCode = getAuthCodeFromURL();
    if (authCode) {
        requestAccessToken(authCode);
    }
    function fetchFitbitData() {
        const accessToken = localStorage.getItem('fitbitAccessToken');
        if (!accessToken) {
            console.error('No access token found. Please authorize Fitbit.');
            return;
        }
    
        fetch('https://api.fitbit.com/1/user/-/activities/steps/date/today/1d.json', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })
        .then(response => response.json())
        .then(data => console.log('Step Count:', data))
        .catch(error => console.error('Error fetching Fitbit data:', error));
    }
    
    // Call function after authentication
    fetchFitbitData();  
    function refreshAccessToken(refreshToken) {
        fetch('https://api.fitbit.com/oauth2/token', {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa('23QKCX:1846b2785a1fb7a504bfdf3b7e77b621'),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refreshToken
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Refreshed Token:', data.access_token);
            localStorage.setItem('fitbitAccessToken', data.access_token);
        })
        .catch(error => console.error('Error refreshing token:', error));
    }
        
    
    const newSteps = userData.todaySteps + Math.floor(Math.random() * 100);
    updateUserStats({ todaySteps: newSteps });
}

// Start periodic updates (every 30 seconds for demo)
setInterval(simulateFitnessDataUpdate, 30000);

// Export functions for global access
window.joinChallenge = joinChallenge;
window.updateLeaderboardForChallenge = updateLeaderboardForChallenge;