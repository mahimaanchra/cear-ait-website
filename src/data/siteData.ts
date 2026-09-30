export interface Project {
  id: string;
  title: string;
  category: "Robotics" | "Autonomous" | "Aquatics" | "Manipulation" | "Aerial";
  tagline: string;
  description: string;
  longDescription: string;
  status: "Completed" | "Active R&D" | "Podium Winner" | "Operational";
  tags: string[];
  specs: { label: string; value: string }[];
  highlight?: string;
  githubUrl?: string;
  demoUrl?: string;
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
  accentColor: "blue" | "green" | "yellow" | "red";
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
  id: string;
  name: string;
  role: string;
  subRole?: string;
  tier: "faculty" | "secretary" | "joint_secretary" | "contributor";
  quote?: string;
  specialization?: string;
  avatarBg?: string;
  avatarInitials?: string;
  imageUrl?: string;
  linkedin?: string;
  github?: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  category: string;
  status: "Upcoming" | "Ongoing" | "Completed";
  description: string;
  location: string;
  ctaText: string;
}

export interface WorkshopMediaItem {
  id: string;
  title: string;
  category: "Club Room & Workbenches" | "Fabrication Bay" | "Bootcamps & Cadets" | "Testing Arena";
  description: string;
  imageUrl: string;
  badge: string;
  specs?: string[];
}

export const siteConfig = {
  name: "CEAR",
  fullName: "Centre of Excellence for AI & Robotics",
  shortTitle: "CEAR AIT",
  college: "Army Institute of Technology, Pune",
  affiliation: "Affiliated to SPPU, Pune",
  tagline: "BUILD • INNOVATE • AUTOMATE",
  heroSubtitle:
    "Autonomous robotics, defense mechatronics, and embedded intelligence at Army Institute of Technology, Pune.",
  vision:
    "Building an interdisciplinary ecosystem for autonomous defense systems, embedded hardware, and applied AI.",
  mission:
    "Conducting practical research in robotics, edge AI, and tactical mechatronics through rapid hardware engineering.",
  address: "Army Institute of Technology, Alandi Road, Dighi, Pune, Maharashtra 411015",
  contactEmail: "cear@aitpune.edu.in",
  labLocation: "CEAR Robotics Wing, Lab 104",
  socials: {
    instagram: "https://instagram.com/robotics.club_ait",
    linkedin: "https://linkedin.com/company/cear-ait",
    github: "https://github.com/cear-ait",
    discord: "https://discord.gg/cear-ait",
  },
  stats: [
    { value: "50+", label: "Robots Built", accent: "blue" },
    { value: "15+", label: "Podiums", accent: "yellow" },
    { value: "120+", label: "Innovators", accent: "green" },
    { value: "100%", label: "Hardware", accent: "red" },
  ],
};

export const focusAreas = [
  {
    id: "ai",
    title: "Artificial Intelligence",
    tag: "Edge AI & RL",
    description:
      "Quantized neural networks, reinforcement learning, and real-time decision algorithms on embedded accelerators.",
    bullets: ["Edge AI Inference", "Reinforcement Learning", "Predictive Diagnostics", "Adaptive Trajectories"],
    accent: "blue",
  },
  {
    id: "robotics",
    title: "Embedded Robotics",
    tag: "Hardware & PCB",
    description:
      "Custom multi-layer PCBs, high-torque BLDC motor drives, and real-time ROS2 communication pipelines.",
    bullets: ["Custom Multilayer PCBs", "ROS2 Architecture", "High-Torque Drives", "Telemetry Links"],
    accent: "green",
  },
  {
    id: "vision",
    title: "Computer Vision",
    tag: "Sensing & Depth",
    description:
      "3D LiDAR point clouds, depth sensor fusion, optical flow odometry, and high-speed target segmentation.",
    bullets: ["LiDAR Point Clouds", "Sensor Fusion", "Optical Flow Odometry", "YOLO Detection"],
    accent: "yellow",
  },
  {
    id: "autonomous",
    title: "Autonomous Systems",
    tag: "Tactical SLAM",
    description:
      "GPS-denied path planning, multi-robot swarm coordination, and tactical fail-safe navigation protocols.",
    bullets: ["GPS-Denied Navigation", "Swarm Coordination", "Path Generation", "Tactical Fail-Safe"],
    accent: "red",
  },
];

// Strict Team Hierarchy:
// 1. Faculty In-Charge (Top spotlight)
export const facultyIncharge: TeamMember = {
  id: "faculty-patil",
  name: "Dr. Avinash Patil",
  role: "Faculty In-Charge & Head, CEAR",
  subRole: "Professor, Department of E&TC, AIT Pune",
  tier: "faculty",
  specialization: "Robotics Architecture, Control Systems & Embedded Automation",
  avatarInitials: "AP",
  avatarBg: "bg-blue-600 text-white",
};

// 2. Secretaries (Core executive leads)
export const secretaries: TeamMember[] = [
  {
    id: "sec-tejas",
    name: "Tejas Jape",
    role: "Secretary, CEAR",
    subRole: "Executive Lead • Hardware & Drive Systems",
    tier: "secretary",
    specialization: "Chassis Fabrication, Drive Telemetry, High-Torque Kinematics",
    avatarInitials: "TJ",
    avatarBg: "bg-blue-700 text-white",
  },
  {
    id: "sec-pragati",
    name: "Pragati",
    role: "Secretary, CEAR",
    subRole: "Executive Lead • Autonomous Software",
    tier: "secretary",
    specialization: "Algorithmic Control, Sensor Calibration, Mission Architecture",
    avatarInitials: "PR",
    avatarBg: "bg-emerald-600 text-white",
  },
];

// 3. Joint Secretaries (Domain leads)
export const jointSecretaries: TeamMember[] = [
  {
    id: "js-prateek",
    name: "Prateek Nehra",
    role: "Joint Secretary",
    subRole: "Domain Lead • Aquatics & Aerial Swarms",
    tier: "joint_secretary",
    specialization: "ROS2 Nav2, Hydrodynamic Hulls, Swarm Telemetry",
    avatarInitials: "PN",
    avatarBg: "bg-blue-600 text-white",
  },
  {
    id: "js-aryan",
    name: "Aryan Singh",
    role: "Joint Secretary",
    subRole: "Domain Lead • Fabrication & Chassis Engineering",
    tier: "joint_secretary",
    specialization: "CNC Milling, Stress Modeling, Hardened Combat Armor",
    avatarInitials: "AS",
    avatarBg: "bg-amber-600 text-white",
  },
  {
    id: "js-rohan",
    name: "Rohan Dangi",
    role: "Joint Secretary",
    subRole: "Domain Lead • Mechanical & Combat Systems",
    tier: "joint_secretary",
    specialization: "Thrust Vectoring, Sealed Enclosures, Power Distribution",
    avatarInitials: "RD",
    avatarBg: "bg-red-600 text-white",
  },
  {
    id: "js-drishti",
    name: "Drishti",
    role: "Joint Secretary",
    subRole: "Domain Lead • Sensors & Firmware",
    tier: "joint_secretary",
    specialization: "Optical Line Arrays, IMU Calibration, Low-Noise Telemetry",
    avatarInitials: "DR",
    avatarBg: "bg-emerald-600 text-white",
  },
];

// 4. First Year Members / Core Contributors (Grid cards)
export const coreContributors: TeamMember[] = [
  {
    id: "contrib-nancy",
    name: "Nancy",
    role: "Operations & Logistics Lead",
    subRole: "Wartech Event Direction",
    tier: "contributor",
    specialization: "National Event Direction, Outstation Logistics",
    avatarInitials: "NA",
    avatarBg: "bg-slate-700 text-white",
  },
  {
    id: "contrib-aman",
    name: "Aman Derker",
    role: "Embedded Systems Specialist",
    subRole: "Custom PCB Architecture",
    tier: "contributor",
    specialization: "MOSFET Motor Bridges, KiCad Routing, STM32",
    avatarInitials: "AD",
    avatarBg: "bg-blue-600 text-white",
  },
  {
    id: "contrib-mantu",
    name: "Mantu Dutta",
    role: "Power & Electronics Lead",
    subRole: "Battery Management & Power Rails",
    tier: "contributor",
    specialization: "LiPo Safety Arrays, Regulated DC Rails, Telemetry",
    avatarInitials: "MD",
    avatarBg: "bg-amber-600 text-white",
  },
  {
    id: "contrib-kshitij",
    name: "Kshitij",
    role: "Combat Robotics Specialist",
    subRole: "Drive Dynamics & Weaponry",
    tier: "contributor",
    specialization: "Differential Drive Dynamics, Hardened Steel Wedges",
    avatarInitials: "KS",
    avatarBg: "bg-red-600 text-white",
  },
  {
    id: "fy-vikramaditya",
    name: "Cadet Vikramaditya",
    role: "First Year Member",
    subRole: "Microcontrollers & Line Tracing",
    tier: "contributor",
    specialization: "ESP32, PID Algorithms, Sensor Arrays",
    avatarInitials: "VK",
    avatarBg: "bg-slate-800 text-white",
  },
  {
    id: "fy-ananya",
    name: "Cadet Ananya Sharma",
    role: "First Year Member",
    subRole: "Computer Vision & ROS2",
    tier: "contributor",
    specialization: "OpenCV, YOLO Inference, ROS2 Nodes",
    avatarInitials: "AS",
    avatarBg: "bg-emerald-700 text-white",
  },
  {
    id: "fy-sahil",
    name: "Cadet Sahil Verma",
    role: "First Year Member",
    subRole: "CAD & Rapid Prototyping",
    tier: "contributor",
    specialization: "SolidWorks, FDM Prototyping, Kinematics",
    avatarInitials: "SV",
    avatarBg: "bg-blue-800 text-white",
  },
  {
    id: "fy-tanya",
    name: "Cadet Tanya Rawat",
    role: "First Year Member",
    subRole: "Sensors & Telemetry",
    tier: "contributor",
    specialization: "Wireless RF, Telemetry UI, Sensor Calibration",
    avatarInitials: "TR",
    avatarBg: "bg-amber-700 text-white",
  },
];

export const projects: Project[] = [
  {
    id: "robotic-arm",
    title: "6-DOF Articulated Arm",
    category: "Manipulation",
    tagline: "High-precision articulated manipulator for inverse kinematic trajectory execution.",
    description:
      "Multi-axis manipulator with closed-loop servo feedback and inverse kinematics for sub-millimeter precision.",
    longDescription:
      "Designed and fabricated from the ground up at the CEAR lab, this multi-degree-of-freedom robotic arm utilizes closed-loop servo telemetry and real-time kinematic calculations.",
    status: "Active R&D",
    highlight: "Inverse Kinematic Solver • Sub-mm Accuracy",
    tags: ["ROS2", "Computer Vision", "C++", "Kinematics", "Servo Telemetry"],
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
    title: "Jalpari Amphibious Bot",
    category: "Aquatics",
    tagline: "Amphibious underwater robot winning 3rd Position & Unique Design Award at IIT Guwahati Techniche.",
    description:
      "Hydrodynamic underwater exploration robot with passive ballast control and high-thrust brushless propulsion.",
    longDescription:
      "Jalpari was engineered to conquer complex underwater challenges at IIT Guwahati's Aquawar. Featuring a custom waterproof acrylic chassis, high-thrust brushless thrusters, and precision ballast buoyancy management.",
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
    title: "Master-Slave Teleoperation Rig",
    category: "Manipulation",
    tagline: "Bilateral teleoperation system featuring real-time angular mirroring and sensory feedback.",
    description:
      "Bilateral teleoperation arm reproducing human joint trajectories in real time over low-latency wireless links.",
    longDescription:
      "Built for hazardous ordnance disposal and remote laboratory operations, this system uses an ergonomic wearable master rig fitted with high-resolution magnetic rotary encoders.",
    status: "Operational",
    highlight: "Zero-Lag Kinematic Mirroring & Tactile Feedback",
    tags: ["Teleoperation", "Bilateral Feedback", "Magnetic Encoders", "Low-Latency RF", "C++"],
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
    title: "Pipe-Climbing Robot",
    category: "Autonomous",
    tagline: "Radial autonomous pipeline traversal robot for structural integrity audits.",
    description:
      "Inspection robot with omnidirectional magnetic clamp wheels for vertical and curved pipeline traversal.",
    longDescription:
      "Engineered to inspect critical industrial pipeline infrastructures and defense conduit networks, this bot features magnetic and mechanical clamping arrays that allow it to scale vertical and curved pipes.",
    status: "Completed",
    highlight: "Vertical Traversal & Real-Time Flaw Detection",
    tags: ["Non-Destructive Testing", "Pneumatic Clamp", "Ultrasonic Sensors", "Autonomous Climb", "Python"],
    specs: [
      { label: "Pipe Diameter Range", value: "150 mm to 400 mm" },
      { label: "Climbing Angle", value: "0° to 90° Vertical Climb" },
      { label: "Sensory Payload", value: "Ultrasonic Thickness & HD Optical" },
      { label: "Adhesion Mechanism", value: "Dual Spring-Loaded Roller Tracks" },
      { label: "Inspection Speed", value: "0.2 m/s steady scan" },
    ],
    githubUrl: "https://github.com/cear-ait/pipe-climbing-bot",
  },
  {
    id: "drone-swarm",
    title: "Autonomous Quadcopter Swarm",
    category: "Aerial",
    tagline: "Synchronized multi-agent quadcopter swarm for GPS-denied tactical surveillance.",
    description:
      "Synchronized fleet of quadcopters running ROS2 Nav2 and optical flow for GPS-denied reconnaissance.",
    longDescription:
      "Engineered for tactical indoor recon and perimeter security, each drone features an onboard companion processor running decentralized swarm flight controllers.",
    status: "Active R&D",
    highlight: "Decentralized Swarm Flight & Optical Flow SLAM",
    tags: ["ROS2", "Computer Vision", "Swarm Telemetry", "PX4 Autopilot", "Python"],
    specs: [
      { label: "Fleet Capacity", value: "4x Synchronized Quadcopters" },
      { label: "Flight Endurance", value: "22 mins continuous hover" },
      { label: "Navigation Mode", value: "GPS-Denied Optical Flow + Lidar" },
      { label: "Autopilot", value: "PX4 on STM32 H7 Controller" },
      { label: "Communication", value: "5.8GHz Mesh Telemetry" },
    ],
    githubUrl: "https://github.com/cear-ait/swarm-quadcopters",
  },
  {
    id: "tactical-rover",
    title: "Tactical Ground Rover",
    category: "Autonomous",
    tagline: "Rugged all-terrain autonomous rover featuring 3D LiDAR SLAM and obstacle evasion.",
    description:
      "4WD rocker-bogie rover running NVIDIA Jetson edge inference and Livox 3D LiDAR SLAM.",
    longDescription:
      "Built on a CNC-machined aluminum chassis with rocker-bogie suspension, this rover navigates hostile uneven terrain effortlessly.",
    status: "Operational",
    highlight: "NVIDIA Jetson Edge Inference • Rocker-Bogie Suspension",
    tags: ["ROS2", "Computer Vision", "C++", "LiDAR SLAM", "Jetson Edge"],
    specs: [
      { label: "Drive Configuration", value: "4WD Independent BLDC Motors" },
      { label: "Payload Capacity", value: "15 kg tactical sensor payload" },
      { label: "Obstacle Clearance", value: "Up to 180 mm obstacle steps" },
      { label: "Processing Core", value: "NVIDIA Jetson Orin Nano" },
      { label: "Sensor Array", value: "Livox Mid-360 LiDAR + Depth Cam" },
    ],
    githubUrl: "https://github.com/cear-ait/tactical-ground-rover",
  },
];

export const wartechTracks: WartechTrack[] = [
  {
    id: "robo-soccer",
    title: "Robo Soccer",
    trackCode: "WT-01",
    tagline: "2v2 tactical ball control, pneumatic kickers, and high-speed wireless maneuvering.",
    description:
      "Teams clash in an enclosed synthetic turf arena. Bots execute offensive dribbles, tactical blocks, and high-velocity strikes with custom mechanical and pneumatic kickers.",
    arenaType: "Enclosed Synthetic Turf Pitch with Goalposts",
    teamSize: "2–4 Members",
    prizePool: "₹35,000",
    rulesHighlight: ["2v2 Match Format", "Pneumatic/spring kickers allowed", "5-minute halves", "Weight limit: 5kg"],
    status: "Filling Fast",
    iconName: "Trophy",
    accentColor: "blue",
  },
  {
    id: "robo-race",
    title: "Robo Race",
    trackCode: "WT-02",
    tagline: "All-terrain obstacle circuit featuring gravel traps, oil slicks, ramps, and hairpins.",
    description:
      "An aggressive high-speed racing circuit featuring oil slicks, gravel traps, elevated bridge drops, and tight hairpin bends. Built for agile drivers and robust chassis suspension.",
    arenaType: "Multi-Terrain Dynamic Race Circuit",
    teamSize: "2–4 Members",
    prizePool: "₹30,000",
    rulesHighlight: ["Time trial + head-to-head heats", "Chassis width: 30cm limit", "Ramp clearing bonus", "Battery cap: 16.8V"],
    status: "Registrations Open",
    iconName: "Flame",
    accentColor: "red",
  },
  {
    id: "drone-racing",
    title: "Drone Racing (Aerial Arena)",
    trackCode: "WT-03",
    tagline: "High-octane FPV quadcopter racing through illuminated 3D neon air gates.",
    description:
      "Pilots navigate micro and mini FPV quadcopters through an intricate 3D netted arena featuring illuminated hoops, dive gates, and sharp hairpin corkscrews.",
    arenaType: "Enclosed Safety-Netted Aerial Arena with LED Gates",
    teamSize: "1–3 Members",
    prizePool: "₹35,000",
    rulesHighlight: ["FPV goggles required", "Propeller guard mandatory", "Timed laps + finals bracket", "3S-4S LiPo max"],
    status: "Registrations Open",
    iconName: "Compass",
    accentColor: "green",
  },
  {
    id: "robo-sumo",
    title: "Robo Sumo",
    trackCode: "WT-04",
    tagline: "High-torque battle of raw mass, traction, and pushing force.",
    description:
      "Two robots lock horns inside an elevated circular dohyo. The objective is pure physical dominance—push your opponent out of the ring without falling off the edge.",
    arenaType: "Elevated Circular Dohyo (Black Matte Surface)",
    teamSize: "2–4 Members",
    prizePool: "₹35,000",
    rulesHighlight: ["Weight limit: 5kg max", "No active projectile weapons", "Best of 3 rounds", "Edge sensor detection"],
    status: "Filling Fast",
    iconName: "ShieldAlert",
    accentColor: "yellow",
  },
  {
    id: "line-tracer",
    title: "Line Tracer (Speed Path)",
    trackCode: "WT-05",
    tagline: "Millisecond-critical autonomous path tracing with high-speed optical arrays.",
    description:
      "Robots traverse an intricate path of high-speed curves, 90-degree corners, and intersecting gridlines using optical sensor arrays and optimized PID algorithms.",
    arenaType: "High-Contrast Polyvinyl Track with Intersections",
    teamSize: "1–3 Members",
    prizePool: "₹25,000",
    rulesHighlight: ["Autonomous navigation only", "Pre-calibrated sensor calibration", "Penalty for track divergence"],
    status: "Registrations Open",
    iconName: "Route",
    accentColor: "blue",
  },
  {
    id: "pick-and-place",
    title: "Pick & Place Arena",
    trackCode: "WT-06",
    tagline: "Tactical dexterity, precision gripping, and obstacle transit.",
    description:
      "Test of gripping mechanics and actuator agility. Bots navigate through hostile obstacle fields, retrieve varied geometric objects, and deposit them into target zones.",
    arenaType: "Tiered Obstacle Course with Loading Bays",
    teamSize: "2–4 Members",
    prizePool: "₹30,000",
    rulesHighlight: ["Mechanical & magnetic grippers permitted", "Time-attack scoring", "Zone difficulty weightage"],
    status: "Registrations Open",
    iconName: "Grab",
    accentColor: "green",
  },
  {
    id: "maze-runner",
    title: "Autonomous Maze Runner",
    trackCode: "WT-07",
    tagline: "Autonomous spatial mapping, micromouse algorithms, and wall-following.",
    description:
      "Fully autonomous micromouse and sensor bots navigate a labyrinthine maze. Utilizing ultrasonic, LiDAR, or IR sensors, bots must compute the shortest exit route.",
    arenaType: "Modular Wooden Labyrinth with Dynamic Walls",
    teamSize: "1–3 Members",
    prizePool: "₹25,000",
    rulesHighlight: ["No manual control allowed", "Exploration run + speed run", "Touch penalties apply"],
    status: "Registrations Open",
    iconName: "Layers",
    accentColor: "yellow",
  },
  {
    id: "stair-climbing",
    title: "Robo Climbex (Stair Climbing)",
    trackCode: "WT-08",
    tagline: "Conquer steep multi-tiered inclines and 45-degree vertical steps.",
    description:
      "A grueling test of mobility, high-torque gearboxes, and multi-link suspension. Bots must ascend continuous multi-level staircases and steep risers without flipping.",
    arenaType: "Graduated Step Arena (Up to 45° Incline)",
    teamSize: "2–4 Members",
    prizePool: "₹30,000",
    rulesHighlight: ["Riser height: 12-18 cm", "Stability and slip resistance scoring", "Flip-recovery allowance"],
    status: "Registrations Open",
    iconName: "Zap",
    accentColor: "red",
  },
];

export const upcomingEvents: EventItem[] = [
  {
    id: "inductions-2026",
    title: "CEAR Annual Inductions 2026",
    date: "October 2026",
    category: "Recruitment",
    status: "Upcoming",
    description: "Annual recruitment drive for FE and SE cadets across AI, robotics, and hardware.",
    location: "Lab 104, AIT Pune",
    ctaText: "Apply Now",
  },
  {
    id: "arduino-bootcamp",
    title: "Embedded Systems Bootcamp",
    date: "November 2026",
    category: "Workshop",
    status: "Ongoing",
    description: "Hands-on ESP32 architecture, motor drivers, sensor interfacing, and rover telemetry.",
    location: "CEAR Hardware Lab",
    ctaText: "View Details",
  },
  {
    id: "ros2-workshop",
    title: "Autonomous Navigation & ROS2",
    date: "December 2026",
    category: "Workshop",
    status: "Upcoming",
    description: "Node communication, Gazebo simulation, SLAM mapping, and LiDAR navigation.",
    location: "Computer Center 3",
    ctaText: "Pre-Register",
  },
  {
    id: "defense-symposium",
    title: "Defense Robotics Symposium",
    date: "August 2026",
    category: "Symposium",
    status: "Completed",
    description: "Showcase of indigenous defense robotics and tactical swarm platforms.",
    location: "AIT Auditorium",
    ctaText: "View Highlights",
  },
];

export const achievements: Achievement[] = [
  {
    id: "aquawar",
    event: "Aquawar 3.0",
    institution: "IIT Guwahati Techniche",
    edition: "2025",
    rank: "3rd Place Podium + Unique Design Award",
    highlight: "Podium finish in aquatic robotics alongside Unique Design trophy.",
    description: "Jalpari amphibious bot secured 3rd position in national aquatic trials with Unique Design honors.",
    category: "Podium",
    year: "2025",
  },
  {
    id: "quarks",
    event: "Quarks Robotics Challenge",
    institution: "BITS Goa",
    edition: "2025",
    rank: "3rd Place Podium",
    highlight: "Bronze in national robotics combat.",
    description: "Demonstrated mechanical stability and tactical maneuvering in high-torque combat arena.",
    category: "Podium",
    year: "2025",
  },
  {
    id: "escalade",
    event: "ESCALADE 13.0",
    institution: "IIT Guwahati",
    edition: "2025-26",
    rank: "National Finalist",
    highlight: "Qualified for national finals after regional zonals.",
    description: "All-terrain climber conquered regional zonals to qualify for National Finals.",
    category: "National Finalist",
    year: "2026",
  },
  {
    id: "cognizance",
    event: "Cognizance 2026",
    institution: "IIT Roorkee",
    edition: "2026",
    rank: "Round 2 Qualifiers",
    highlight: "Advanced to Round 2 in Plasma Pull, Pick & Place, and Line Follower.",
    description: "Custom chassis fabrication and high-torque drives advanced across 3 competitive brackets.",
    category: "National Finalist",
    year: "2026",
  },
];

export const faqs = [
  {
    question: "Who is eligible to join CEAR?",
    answer: "All AIT Pune students across all engineering branches and years are eligible to apply.",
  },
  {
    question: "Is prior robotics or coding experience required?",
    answer: "No prior experience required. Senior members provide hands-on training bootcamps.",
  },
  {
    question: "What hardware resources are available?",
    answer: "3D printers, custom PCB fabrication, LiDAR, Jetson AI accelerators, and dedicated test arenas.",
  },
  {
    question: "How do external college teams register for Wartech?",
    answer: "Register directly through the Wartech portal section. Teams can have 1–4 members.",
  },
];

export const workshopGallery: WorkshopMediaItem[] = [
  {
    id: "lab-overview",
    title: "Multi-Disciplinary Electronics & Assembly Benches",
    category: "Club Room & Workbenches",
    description:
      "Precision digital oscilloscopes, soldering stations, multimeters, and dual-monitor CAD stations where cadets develop robotics control architectures.",
    imageUrl: "/media/workshop/lab-104-overview.jpg",
    badge: "LAB 104 MAIN WING",
    specs: ["Rigol & Keysight Scopes", "JBC Soldering Stations", "Dual CAD Workstations"],
  },
  {
    id: "fabrication-bay",
    title: "3D Printing & Chassis Prototyping Bay",
    category: "Fabrication Bay",
    description:
      "Rapid prototyping line featuring multi-material FDM 3D printers, carbon-fiber composite brackets, and CNC assembly fixtures for combat chassis.",
    imageUrl: "/media/workshop/fabrication-workshop.jpg",
    badge: "RAPID PROTOTYPING",
    specs: ["Multi-Material FDM Printers", "Carbon Fiber Rigging", "Aluminum Extrusions"],
  },
  {
    id: "cadet-bootcamp",
    title: "Autonomous Rover Induction & Hands-On Bootcamp",
    category: "Bootcamps & Cadets",
    description:
      "First and second year cadets working alongside senior leads, programming line-following PID loops, sensor calibration, and microcontrollers.",
    imageUrl: "/media/workshop/student-bootcamp.jpg",
    badge: "CADET WORKSHOP",
    specs: ["ESP32 / STM32 Architecture", "PID Loop Tuning", "Sensor Calibration"],
  },
  {
    id: "testing-arena",
    title: "Indoor Flight Gates & Dynamic Combat Proving Ground",
    category: "Testing Arena",
    description:
      "Enclosed multi-tier testing arena featuring synthetic turf soccer pitch, safety-netted 3D drone gates, and combat armor trial cages.",
    imageUrl: "/media/workshop/testing-arena.jpg",
    badge: "PROVING GROUNDS",
    specs: ["Enclosed Combat Dohyo", "LED Air Gates", "Polyvinyl Turf Pitch"],
  },
  {
    id: "electronics-bench",
    title: "4-Layer PCB Assembly & Micro-Soldering Station",
    category: "Club Room & Workbenches",
    description:
      "High-density custom PCB surface-mount soldering, power distribution rail validation, and low-latency RF telemetry link testing.",
    imageUrl: "/media/workshop/electronics-bench.jpg",
    badge: "PRECISION HARDWARE",
    specs: ["SMD Component Mount", "Digital Thermal Station", "RF Spectrum Analysis"],
  },
];
