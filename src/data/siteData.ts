export interface Project {
  id: string;
  title: string;
  category: "Robotics" | "Autonomous" | "Aquatics" | "Manipulation";
  tagline: string;
  description: string;
  longDescription: string;
  status: "Completed" | "Active R&D" | "Podium Winner" | "Operational";
  tags: string[];
  specs: { label: string; value: string }[];
  highlight?: string;
  githubUrl?: string;
}

export interface WartechTrack {
  id: string;
  title: string;
  trackCode: string;
  tagline: string;
  description: string;
  arenaType: string;
  teamSize: string;
  prizePool: string;
  rulesHighlight: string[];
  status: "Registrations Open" | "Filling Fast" | "Coming Soon";
  iconName: string;
}

export interface Achievement {
  id: string;
  event: string;
  institution: string;
  edition: string;
  rank: string;
  highlight: string;
  description: string;
  category: "Podium" | "National Finalist" | "Special Award" | "Defense Showcase";
  year: string;
}

export interface TeamMember {
  name: string;
  role: string;
  subRole?: string;
  category: "faculty" | "secretary" | "lead";
  bio?: string;
  specialization?: string;
  avatar?: string;
  linkedin?: string;
  instagram?: string;
  github?: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  category: string;
  status: "Upcoming" | "Active / Ongoing" | "Registration Closed";
  description: string;
  location: string;
  ctaText: string;
}

export const siteConfig = {
  name: "CEAR",
  fullName: "Centre of Excellence for AI and Robotics",
  shortTitle: "CEAR AIT",
  college: "Army Institute of Technology, Pune",
  affiliation: "Affiliated to Savitribai Phule Pune University (SPPU)",
  tagline: "BUILD • INNOVATE • AUTOMATE",
  heroSubtitle:
    "Pioneering next-generation autonomous robotics, intelligent control architectures, and tactical defense engineering at Army Institute of Technology.",
  vision:
    "To foster a culture of innovation, hands-on learning, and interdisciplinary collaboration in the field of AI and Robotics, empowering students to become future-ready technocrats and problem-solvers.",
  mission:
    "Spearheading practical research in autonomous mobile platforms, embedded intelligence, and biomechanical manipulation while bridging the gap between rigorous defense applications and modern industry.",
  address: "Army Institute of Technology, Alandi Road, Dighi, Pune, Maharashtra 411015",
  contactEmail: "cear@aitpune.edu.in",
  labLocation: "CEAR Robotics Lab, Mechanical & E&TC Block, Ground Floor",
  socials: {
    instagram: "https://instagram.com/robotics.club_ait",
    linkedin: "https://linkedin.com/company/cear-ait",
    github: "https://github.com/cear-ait",
    whatsapp: "https://chat.whatsapp.com/cear-community",
  },
  stats: [
    { value: "50+", label: "Robots Engineered" },
    { value: "15+", label: "National Podiums" },
    { value: "120+", label: "Cadet Innovators" },
    { value: "100%", label: "Hands-on Hardware" },
  ],
};

export const focusAreas = [
  {
    id: "ai",
    title: "Artificial Intelligence",
    icon: "BrainCircuit",
    description:
      "Developing low-latency edge inference models, neural decision networks, and reinforcement learning agents for adaptive robotics.",
    bullets: ["Edge AI & Neural Hardware", "Reinforcement Learning", "Predictive Diagnostics", "Adaptive Control"],
    color: "from-cyan-500/20 to-blue-500/10",
  },
  {
    id: "robotics",
    title: "Robotics & Embedded Systems",
    icon: "Cpu",
    description:
      "Engineering robust custom PCBs, high-torque motor drives, distributed microcontrollers, and real-time ROS2 communication pipelines.",
    bullets: ["Custom Multilayer PCB Design", "ROS2 Foxy/Humble Framework", "High-Torque BLDC Drivers", "Telemetry Protocols"],
    color: "from-teal-500/20 to-emerald-500/10",
  },
  {
    id: "vision",
    title: "Computer Vision & Sensing",
    icon: "Eye",
    description:
      "Spatial depth perception, multi-spectral thermal imaging, and real-time obstacle segmentation in high-speed, dynamic environments.",
    bullets: ["Real-Time LiDAR Point Clouds", "Thermal & Visual Sensor Fusion", "Optical Flow Localization", "Object Classification"],
    color: "from-blue-500/20 to-cyan-500/10",
  },
  {
    id: "autonomous",
    title: "Autonomous Systems",
    icon: "Navigation",
    description:
      "Autonomous trajectory generation, swarm coordination, and SLAM in complex, GPS-denied tactical and subterranean terrains.",
    bullets: ["GPS-Denied SLAM Traversal", "Swarm Coordination Protocols", "A* & DWA Path Generation", "Tactical Fail-Safe Modes"],
    color: "from-purple-500/20 to-cyan-500/10",
  },
];

export const projects: Project[] = [
  {
    id: "robotic-arm",
    title: "Robotic Arm",
    category: "Manipulation",
    tagline: "High-precision 6-DOF articulated robotic manipulator for surgical payload execution and industrial sorting.",
    description:
      "A high-precision articulated robotic arm engineered for multi-axis dexterity, inverse kinematic path trajectory execution, and accurate pick-and-place automation.",
    longDescription:
      "Designed and fabricated from the ground up at the CEAR lab, this multi-degree-of-freedom robotic arm utilizes closed-loop servo telemetry and real-time kinematic calculations. Equipped with custom interchangeable end-effectors, tactile pressure sensors, and intuitive micro-step positional feedback, it achieves sub-millimeter repeatable precision.",
    status: "Active R&D",
    highlight: "Inverse Kinematic Solver • Sub-mm Accuracy",
    tags: ["Kinematics", "ROS2", "Servo Telemetry", "Custom End-Effector", "C++"],
    specs: [
      { label: "Degrees of Freedom", value: "6-DOF Articulated" },
      { label: "Payload Capacity", value: "2.5 kg at full reach" },
      { label: "Reach Radius", value: "720 mm" },
      { label: "Controller", value: "STM32F4 + ESP32 Sub-processor" },
      { label: "Latency", value: "< 12 ms" },
    ],
    githubUrl: "https://github.com/cear-ait/robotic-arm",
  },
  {
    id: "jalpari",
    title: "Jalpari",
    category: "Aquatics",
    tagline: "Amphibious underwater robot winning 3rd Position & Unique Design Award at IIT Guwahati Techniche Aquawar.",
    description:
      "A specialized aquatic exploration and obstacle navigation robot engineered for hydrodynamic stability, ballast equilibrium, and submerged combat maneuvering.",
    longDescription:
      "Jalpari was engineered to conquer complex underwater challenges at IIT Guwahati's Aquawar. Featuring a custom waterproof acrylic chassis, high-thrust brushless thrusters, and precision ballast buoyancy management, Jalpari navigated underwater gates and recovered submerged targets under intense competition constraints.",
    status: "Podium Winner",
    highlight: "Awarded 'Unique Design Award' & 3rd Place at IIT Guwahati Aquawar 3.0",
    tags: ["Marine Robotics", "Brushless Thrusters", "Hydrodynamics", "Wired/Wireless RF", "Ballast Control"],
    specs: [
      { label: "Operating Depth", value: "Up to 5 meters" },
      { label: "Propulsion", value: "4x High-Efficiency T200 Thrusters" },
      { label: "Buoyancy System", value: "Dual Passive Neutral Trim Tanks" },
      { label: "Telemetry", value: "Tethered Ultra-Low Latency Link" },
      { label: "Accolades", value: "3rd Place Podium + Unique Design Award" },
    ],
    githubUrl: "https://github.com/cear-ait/jalpari-aquatic-bot",
  },
  {
    id: "master-slave-arm",
    title: "Master-Slave Robotic Arm",
    category: "Manipulation",
    tagline: "Bilateral teleoperation system featuring real-time angular mirroring and sensory feedback for hazardous zones.",
    description:
      "A dual-unit teleoperation robotic arm system where master telemetry seamlessly commands a synchronized slave arm with tactile sensory feedback.",
    longDescription:
      "Built for hazardous ordnance disposal and remote laboratory operations, this system uses an ergonomic wearable master rig fitted with high-resolution magnetic rotary encoders. The slave unit reproduces human operator joint trajectories in real time over low-latency wireless protocols with collision mitigation algorithms.",
    status: "Operational",
    highlight: "Zero-Lag Kinematic Mirroring & Tactile Feedback",
    tags: ["Teleoperation", "Bilateral Feedback", "Magnetic Encoders", "Low-Latency RF", "Python/C++"],
    specs: [
      { label: "Tracking Precision", value: "14-bit Magnetic Angular Resolution" },
      { label: "Wireless Range", value: "250m Line-of-Sight RF" },
      { label: "Control Latency", value: "< 8 ms transmission" },
      { label: "Grip Force", value: "Up to 45 N clamping force" },
      { label: "Safety System", value: "Watchdog Auto-Brake on Packet Loss" },
    ],
    githubUrl: "https://github.com/cear-ait/master-slave-teleop",
  },
  {
    id: "pipe-climbing-bot",
    title: "Pipe-Climbing Bot",
    category: "Autonomous",
    tagline: "Radial autonomous pipeline traversal robot for structural integrity audits and weld flaw detection.",
    description:
      "An automated inspection robot engineered with high-traction omnidirectional clamp wheels for vertical and inverted pipeline traversal and crack detection.",
    longDescription:
      "Engineered to inspect critical industrial pipeline infrastructures and defense conduit networks, this bot features magnetic and mechanical clamping arrays that allow it to scale vertical and curved pipes. An onboard ultrasonic flaw detector and micro-camera stream real-time telemetry back to an operator dashboard.",
    status: "Completed",
    highlight: "Vertical Traversal & Real-Time Flaw Detection",
    tags: ["Pipeline Inspection", "Non-Destructive Testing", "Pneumatic Clamp", "Ultrasonic Sensors", "Autonomous Climb"],
    specs: [
      { label: "Pipe Diameter Range", value: "150 mm to 400 mm" },
      { label: "Climbing Angle", value: "0° to 90° Vertical Climb" },
      { label: "Sensory Payload", value: "Ultrasonic Thickness & HD Optical" },
      { label: "Adhesion Mechanism", value: "Dual Spring-Loaded Rubber Roller Tracks" },
      { label: "Inspection Speed", value: "0.2 m/s steady scan" },
    ],
    githubUrl: "https://github.com/cear-ait/pipe-climbing-bot",
  },
];

export const wartechTracks: WartechTrack[] = [
  {
    id: "line-tracer",
    title: "Line Tracer",
    trackCode: "WT-01",
    tagline: "Millisecond-critical high-speed autonomous path tracing.",
    description:
      "Robots must traverse an intricate path of high-speed curves, 90-degree corners, and intersecting gridlines using optical sensor arrays and optimized PID algorithms.",
    arenaType: "High-Contrast Polyvinyl Track with Intersections",
    teamSize: "1–4 Members",
    prizePool: "₹25,000",
    rulesHighlight: ["Autonomous navigation only", "Pre-calibrated sensor calibration", "Penalty for track divergence"],
    status: "Registrations Open",
    iconName: "Route",
  },
  {
    id: "pick-and-place",
    title: "Pick & Place",
    trackCode: "WT-02",
    tagline: "Tactical dexterity, precision gripping, and obstacle transit.",
    description:
      "Test of gripping mechanics and actuator agility. Bots navigate through hostile obstacle fields, retrieve varied geometric objects, and deposit them into target zones.",
    arenaType: "Tiered Obstacle Course with Loading Bays",
    teamSize: "2–4 Members",
    prizePool: "₹30,000",
    rulesHighlight: ["Mechanical & magnetic grippers permitted", "Time-attack scoring", "Zone difficulty weightage"],
    status: "Registrations Open",
    iconName: "Grab",
  },
  {
    id: "robo-sumo",
    title: "Robo Sumo",
    trackCode: "WT-03",
    tagline: "High-torque battle of raw mass, traction, and pushing force.",
    description:
      "Two robots lock horns inside an elevated circular dohyo. The objective is pure physical dominance—push your opponent out of the ring without falling off the edge.",
    arenaType: "Elevated Circular Dohyo (Black Matte Surface)",
    teamSize: "2–4 Members",
    prizePool: "₹35,000",
    rulesHighlight: ["Weight limit: 5kg max", "No active projectile weapons", "Best of 3 rounds"],
    status: "Filling Fast",
    iconName: "ShieldAlert",
  },
  {
    id: "robo-race",
    title: "Robo Race",
    trackCode: "WT-04",
    tagline: "Blistering speed through rugged all-terrain chicanes.",
    description:
      "An aggressive high-speed racing circuit featuring oil slicks, gravel traps, elevated ramps, bridge drops, and tight hairpin bends. Built for agile drivers.",
    arenaType: "Multi-Terrain Dynamic Race Circuit",
    teamSize: "2–4 Members",
    prizePool: "₹30,000",
    rulesHighlight: ["Time trial + head-to-head heats", "Chassis width: 30cm limit", "Ramp clearing bonus"],
    status: "Registrations Open",
    iconName: "Flame",
  },
  {
    id: "robo-soccer",
    title: "Robo Soccer",
    trackCode: "WT-05",
    tagline: "Teamwork, tactical kicking mechanisms, and rapid wireless control.",
    description:
      "Teams of mobile robots clash in a synthetic turf arena, executing offensive dribbles, defensive tackles, and high-velocity strikes with custom kicker solenoids.",
    arenaType: "Enclosed Synthetic Turf Pitch with Goalposts",
    teamSize: "3–5 Members",
    prizePool: "₹35,000",
    rulesHighlight: ["2v2 Match Format", "Pneumatic/spring kickers allowed", "5-minute halves"],
    status: "Filling Fast",
    iconName: "Trophy",
  },
  {
    id: "maze-runner",
    title: "Maze Runner",
    trackCode: "WT-06",
    tagline: "Autonomous spatial mapping and real-time obstacle negotiation.",
    description:
      "Fully autonomous micromouse and sensor bots navigate a labyrinthine maze. Utilizing ultrasonic, LiDAR, or IR sensors, bots must compute the shortest exit route.",
    arenaType: "Modular Wooden Labyrinth with Dynamic Walls",
    teamSize: "1–3 Members",
    prizePool: "₹25,000",
    rulesHighlight: ["No manual control allowed", "Exploration run + speed run", "Touch penalties apply"],
    status: "Registrations Open",
    iconName: "Compass",
  },
  {
    id: "stair-climbing",
    title: "Stair Climbing (Robo Climbex)",
    trackCode: "WT-07",
    tagline: "Conquer steep multi-tiered inclines and vertical steps.",
    description:
      "A grueling test of mobility, high-torque gearboxes, and multi-link suspension. Bots must ascend continuous multi-level staircases and steep risers without flipping.",
    arenaType: "Graduated Step Arena (Up to 45° Incline)",
    teamSize: "2–4 Members",
    prizePool: "₹30,000",
    rulesHighlight: ["Riser height: 12-18 cm", "Stability and slip resistance scoring", "Flip-recovery allowance"],
    status: "Registrations Open",
    iconName: "Layers",
  },
];

export const achievements: Achievement[] = [
  {
    id: "aquawar",
    event: "Aquawar 3.0",
    institution: "IIT Guwahati Techniche",
    edition: "2025",
    rank: "3rd Place Podium + Unique Design Award",
    highlight: "Podium finish in aquatic robotics alongside the Unique Design trophy.",
    description:
      "CEAR's Jalpari amphibious bot secured 3rd position in national aquatic trials and earned the coveted Unique Design Award for innovative waterproof propulsion and stability architecture.",
    category: "Podium",
    year: "2025",
  },
  {
    id: "quarks",
    event: "Quarks Robotics Challenge",
    institution: "BITS Goa",
    edition: "2025",
    rank: "3rd Place Podium",
    highlight: "Secured bronze in high-octane national robotics arena.",
    description:
      "Demonstrated superior mechanical stability and tactical maneuvering in high-torque combat arenas, beating top engineering squads nationwide.",
    category: "Podium",
    year: "2025",
  },
  {
    id: "escalade",
    event: "ESCALADE 13.0",
    institution: "IIT Guwahati",
    edition: "2025-26",
    rank: "Main Campus Finalist",
    highlight: "Qualified for national finals after conquering zonal rounds.",
    description:
      "CEAR's all-terrain climbers conquered regional zonals and secured qualification for the prestigious National Finals at IIT Guwahati's main campus.",
    category: "National Finalist",
    year: "2026",
  },
  {
    id: "cognizance",
    event: "Cognizance 2026",
    institution: "IIT Roorkee",
    edition: "2026",
    rank: "Round 2 Qualifiers across 3 Events",
    highlight: "Advanced to Round 2 in Plasma Pull, Pick & Place, and Line Follower.",
    description:
      "Competed with custom chassis fabrication, high-torque motor drives, and wired/wireless controls, advancing deep into multiple competitive brackets.",
    category: "National Finalist",
    year: "2026",
  },
  {
    id: "drone-expo",
    event: "Drone Expo 2025",
    institution: "National Defense & Drone Forum",
    edition: "2025",
    rank: "Special Demonstration Award",
    highlight: "Synchronized drone swarm in GPS-denied zones & pipeline thermal scan.",
    description:
      "Showcased custom carbon-fiber micro-quadcopters executing synchronized swarm maneuvers running ROS2 localized SLAM, plus simulated autonomous pipeline thermal leak detection.",
    category: "Defense Showcase",
    year: "2025",
  },
  {
    id: "stride",
    event: "Stride 2025 Defense Showcase",
    institution: "Indian Army & MoD Showcase",
    edition: "2025",
    rank: "Commendation for Defense Innovation",
    highlight: "Live demonstration of tactical autonomous robotics before Army leadership.",
    description:
      "Demonstrated cutting-edge indigenous defense robotics prototypes, autonomous ground vehicles, and tactical sensors bridging academia and private defense industry.",
    category: "Defense Showcase",
    year: "2025",
  },
  {
    id: "robocon",
    event: "DD Robocon 2025",
    institution: "Asia-Pacific Broadcasting Union",
    edition: "2025",
    rank: "National Contestant",
    highlight: "Built synchronized dual-robot automated alliance platform.",
    description:
      "Designed and fabricated synchronized autonomous and manual robots adhering to strict international athletic task regulations and high-speed pneumatic throwing.",
    category: "National Finalist",
    year: "2025",
  },
  {
    id: "techfest",
    event: "Techfest 2025",
    institution: "IIT Bombay",
    edition: "2025",
    rank: "National Competitor",
    highlight: "Contested in Asia's largest robotics proving ground.",
    description:
      "Represented AIT in high-speed autonomous navigation and heavy-weight combat tracks with advanced chassis reinforcement and fast battery swap architecture.",
    category: "National Finalist",
    year: "2025",
  },
];

export const facultyIncharge: TeamMember = {
  name: "Dr. Avinash Patil",
  role: "Faculty Incharge & Head, CEAR",
  subRole: "Professor, Army Institute of Technology",
  category: "faculty",
  bio: "Guiding CEAR's vision toward groundbreaking defense robotics, interdisciplinary engineering excellence, and academic-industry collaborative research.",
  specialization: "Robotics Architecture, Embedded Automation & Control Systems",
  avatar: "/team/faculty-patil.png",
  linkedin: "https://linkedin.com",
};

export const secretaries: TeamMember[] = [
  {
    name: "Tejas Jape",
    role: "Secretary, CEAR",
    subRole: "Robotics & Embedded Systems",
    category: "secretary",
    bio: "Leading club operations, hardware fabrication, and tactical team coordination across national robotics championships.",
    specialization: "Chassis Fabrication, Drive System Integration, Hardware Telemetry",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    github: "https://github.com",
  },
  {
    name: "Pragati",
    role: "Secretary, CEAR",
    subRole: "Autonomous Software & Coordination",
    category: "secretary",
    bio: "Spearheading software algorithms, sensor calibration modules, and strategic coordination for flagship events.",
    specialization: "Algorithmic Control, Sensor Integration, Event Management",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    github: "https://github.com",
  },
];

export const coreTeam: TeamMember[] = [
  {
    name: "Prateek Nehra",
    role: "Technical Lead",
    subRole: "Aquatics & Swarm Drones",
    category: "lead",
    specialization: "ROS2, Hydrodynamic Hull Design, Swarm Protocols",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Aryan Singh",
    role: "Hardware & Fabrication Lead",
    subRole: "Chassis & Actuators",
    category: "lead",
    specialization: "CNC Milling, Stress Modeling, Combat Armor",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Rohan Dangi",
    role: "Mechanical & Systems Lead",
    subRole: "Combat & Aquatic Platforms",
    category: "lead",
    specialization: "Thrust Vectoring, Sealed Enclosures, Power Distribution",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Drishti",
    role: "Sensors & Firmware Lead",
    subRole: "Embedded Microcontrollers",
    category: "lead",
    specialization: "Optical Line Arrays, IMU Calibration, Low-Noise Telemetry",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Nancy",
    role: "Operations & Event Lead",
    subRole: "Event Logistics & PR",
    category: "lead",
    specialization: "Wartech Event Direction, Outstation Logistics",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Aman Derker",
    role: "Embedded Systems Specialist",
    subRole: "PCB Architecture",
    category: "lead",
    specialization: "High-Voltage Motor MOSFET Bridges, KiCad Routing",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Mantu Dutta",
    role: "Power & Electronics Lead",
    subRole: "Battery Management & Power",
    category: "lead",
    specialization: "LiPo Safety Arrays, Regulated DC Rails, Telemetry",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Kshitij",
    role: "Combat Robotics Specialist",
    subRole: "Drive Dynamics",
    category: "lead",
    specialization: "Differential Drive Dynamics, Hardened Steel Wedges",
    linkedin: "https://linkedin.com",
  },
];

export const upcomingEvents: EventItem[] = [
  {
    id: "inductions-2026",
    title: "CEAR Annual Inductions 2026-27",
    date: "October 2026",
    category: "Recruitment",
    status: "Upcoming",
    description:
      "Join the elite engineering league at AIT. Open to all first and second year enthusiasts passionate about AI, electronics, mechanical fabrication, and coding.",
    location: "Manekshaw Hall & CEAR Lab",
    ctaText: "Apply for Inductions",
  },
  {
    id: "arduino-bootcamp",
    title: "Hands-on Microcontrollers & IoT Bootcamp",
    date: "November 2026",
    category: "Workshop",
    status: "Active / Ongoing",
    description:
      "Comprehensive multi-day workshop on ESP32, motor drivers, sensor interfacing, and building your very first teleoperated robot.",
    location: "Robotics Hardware Lab, AIT",
    ctaText: "View Workshop Details",
  },
  {
    id: "ros2-workshop",
    title: "Autonomous Swarm & ROS2 Winter Workshop",
    date: "December 2026",
    category: "Advanced Workshop",
    status: "Upcoming",
    description:
      "Master node communication, Gazebo simulation, SLAM mapping, and lidar point cloud navigation with certified industry mentors.",
    location: "Computer Center 3, AIT",
    ctaText: "Pre-Register",
  },
  {
    id: "wartech-fest",
    title: "WARTECH 2026 National Championship",
    date: "March 2027",
    category: "Flagship Festival",
    status: "Upcoming",
    description:
      "CEAR's biggest annual robotics festival featuring 7 high-impact combat and autonomous tracks with competitors across India.",
    location: "AIT Central Arenas & Open Ground",
    ctaText: "Explore Wartech",
  },
];

export const faqs = [
  {
    question: "Who can join the Centre of Excellence for AI and Robotics?",
    answer:
      "CEAR welcomes all students of Army Institute of Technology, Pune regardless of their branch. Whether you're in Computer Engineering, IT, Mechanical, or E&TC, there are specialized modules spanning hardware design, firmware, mechanical fabrication, and AI software.",
  },
  {
    question: "Do I need prior robotics or coding experience to apply for inductions?",
    answer:
      "No! We look for genuine curiosity, problem-solving mindset, and dedication. Our senior members and faculty provide intensive training bootcamps starting from fundamental microcontroller electronics to advanced ROS2 and machine learning frameworks.",
  },
  {
    question: "What hardware and resources are available in the CEAR Lab?",
    answer:
      "The lab is outfitted with 3D printers, precision PCB fabrication tools, high-capacity DC power supplies, oscilloscopes, LiDAR modules, depth cameras, ROS2 companion computers (Jetson & Raspberry Pi), and dedicated test arenas for combat and autonomous navigation.",
  },
  {
    question: "How do outstation college teams register for Wartech tracks?",
    answer:
      "Wartech track registrations open online right here on the portal. Teams can register up to 4 members per track, access official rulebooks, and secure slots before entries cap.",
  },
];
