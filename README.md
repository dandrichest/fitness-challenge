# Fitness Challenge

A modern, gamified fitness platform that combines fitness tracking with social motivation to help users stay active and engaged with their health goals.

## 🚀 Features

### Core Functionality
- **Fitness Tracking Display** - Real-time visualization of steps, calories, workouts, water intake, and heart rate
- **Challenge System** - Create, join, and compete in various fitness challenges
- **Leaderboard** - Dynamic rankings based on user activity and progress
- **Social Features** - Connect with friends, share achievements, and stay motivated together
- **Achievement System** - Earn badges and rewards for reaching milestones
- **Progress Monitoring** - Track daily, weekly, and monthly fitness progress

### Gamification Elements
- **Points System** - Earn points for completing activities and challenges
- **Badges & Achievements** - Unlock rewards for various fitness milestones
- **Streaks** - Maintain daily activity streaks for bonus points
- **Competitive Challenges** - Compete with friends and community members
- **Social Sharing** - Share accomplishments on social media platforms

## 🎨 Design System

### Color Scheme
- **Primary Colors**
  - Electric Blue (#007BFF) - Trust and motivation
  - Neon Green (#32CD32) - Vitality and health
  - Vibrant Red (#FF3B30) - Excitement and urgency

- **Secondary Colors**
  - Dark Gray (#333333) - Professional text and backgrounds
  - Soft Yellow (#FFD700) - Achievements and rewards
  - Pure White (#FFFFFF) - Clean and minimal UI

- **Accent Colors**
  - Purple (#8E44AD) - Creativity and uniqueness
  - Cyan (#17A2B8) - Fresh and energetic
  - Pink (#E91E63) - Fun and engaging

### Typography
- **Headings**: Inter, Montserrat - Bold and motivational
- **Body Text**: Inter, Roboto - Clean and readable
- **Action Elements**: Inter - Modern and friendly

## 📱 Progressive Web App (PWA)

Fitness Challenge is built as a Progressive Web App with:
- **Offline Functionality** - Core features work without internet
- **Mobile Responsive** - Optimized for all device sizes
- **App-like Experience** - Can be installed on mobile devices
- **Fast Loading** - Optimized performance and caching

## 🛠 Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Variables and Flexbox/Grid
- **Icons**: SVG icons for scalability and performance
- **Data Storage**: LocalStorage for offline functionality
- **PWA Features**: Web App Manifest, Service Worker ready

## 📁 Project Structure

```
├── index.html              # Main dashboard page
├── challenge.html           # Challenge details and leaderboard
├── profile.html            # User profile and achievements
├── assets/
│   ├── styles.css          # Main stylesheet
│   ├── script.js           # JavaScript functionality
│   └── images/             # Icons, badges, and graphics
├── data/
│   ├── challenges.json     # Challenge definitions
│   └── users.json          # User data and progress
├── manifest.json           # PWA manifest
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)


### Usage
1. **Dashboard**: View your daily stats, current challenges, and progress
2. **Challenges**: Browse available challenges and join new ones
3. **Profile**: Check your achievements, friends, and activity history
4. **Create Challenges**: Set up custom fitness challenges for the community

## 🔧 Configuration

### Customizing Challenges
Edit `data/challenges.json` to add new challenge types:
```json
{
  "id": 6,
  "name": "Custom Challenge",
  "description": "Your challenge description",
  "type": "custom",
  "duration": 14,
  "target": 100,
  "unit": "points",
  "prize": "Custom reward"
}
```

### User Data
User progress is stored in LocalStorage. For production, integrate with:
- **Fitness APIs**: Fitbit
- **Authentication**: OAuth, JWT tokens

## 🌐 API Integration

### Fitness Tracking APIs
The platform is designed to integrate with:
- **Fitbit Web API** - Fitbit device data
a

### Social Media APIs
For sharing achievements:
- **Facebook Graph API** - Share to Facebook
- **Twitter API** - Tweet achievements
- **Instagram Basic Display API** - Share to Instagram

## 📊 Data Structure

### User Object
```javascript
{
  id: 1,
  name: "User Name",
  avatar: "👤",
  stats: {
    totalPoints: 1950,
    globalRank: 3,
    currentStreak: 15,
    totalSteps: 298650
  },
  currentChallenges: [...],
  badges: [...],
  friends: [...]
}
```

### Challenge Object
```javascript
{
  id: 1,
  name: "Challenge Name",
  description: "Challenge description",
  type: "steps",
  duration: 30,
  participants: 24,
  status: "active",
  prize: "Reward description"
}
```


**Fitness Challenge** - Gamifying fitness, one challenge at a time! 🏆💪 