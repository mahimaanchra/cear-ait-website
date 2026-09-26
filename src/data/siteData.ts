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
  quote: string;
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

export const siteConfig = {
  name: "CEAR",
  fullName: "Centre of Excellence for AI & Robotics",
  shortTitle: "CEAR AIT",
  college: "Army Institute of Technology, Pune",
  affiliation: "Affiliated to Savitribai Phule Pune University (SPPU)",
  tagline: "BUILD • INNOVATE • AUTOMATE",
  heroSubtitle:
    "Engineering autonomous robotics, intelligent control architectures, and high-performance hardware craft at Army Institute of Technology.",
  vision:
    "To build an interdisciplinary ecosystem that empowers cadet engineers to design, build, and deploy cutting-edge autonomous defense systems, embedded hardware, and AI algorithms.",
  mission:
    "Spearheading practical research in autonomous robotics, low-latency edge AI, and tactical defense mechatronics while training the next generation of technological leaders.",
  address: "Army Institute of Technology, Alandi Road, Dighi, Pune, Maharashtra 411015",
  contactEmail: "cear@aitpune.edu.in",
  labLocation: "CEAR Robotics Wing, Lab 104, Ground Floor",
  socials: {
    instagram: "https://instagram.com/robotics.club_ait",
    linkedin: "https://linkedin.com/company/cear-ait",
    github: "https://github.com/cear-ait",
    discord: "https://discord.gg/cear-ait",
  },
  stats: [
    { value: "50+", label: "Robots Engineered", accent: "blue" },
    { value: "15+", label: "National Podiums", accent: "yellow" },
    { value: "120+", label: "Cadet Innovators", accent: "green" },
    { value: "100%", label: "Hardware Craft", accent: "red" },
  ],
};

export const focusAreas = [
  {
    id: "ai",
    title: "Artificial Intelligence",
    tag: "Neural Edge & RL",
    description:
      "Deploying quantized edge neural networks, spatial reinforcement learning models, and real-time decision algorithms on embedded accelerators.",
    bullets: ["Edge AI Inference", "Reinforcement Learning", "Predictive Diagnostics", "Adaptive Trajectories"],
    accent: "blue",
  },
  {
    id: "robotics",
    title: "Embedded Robotics",
    tag: "Hardware & PCB",
    description:
      "Designing multi-layer custom PCBs, high-torque BLDC motor drives, and real-time ROS2 micro-ros communication pipelines.",
    bullets: ["Custom Multilayer PCBs", "ROS2 Humble Architecture", "High-Torque Drives", "Telemetry Links"],
    accent: "green",
  },
  {
    id: "vision",
    title: "Computer Vision",
    tag: "Sensing & Depth",
    description:
      "Real-time 3D LiDAR point cloud processing, depth sensor fusion, optical flow localization, and high-speed obstacle segmentation.",
    bullets: ["LiDAR Point Clouds", "Thermal Sensor Fusion", "Optical Flow Odometry", "YOLO Object Detection"],
    accent: "yellow",
  },
  {
    id: "autonomous",
    title: "Autonomous Systems",
    tag: "Tactical SLAM",
    description:
      "Autonomous path planning in GPS-denied environments, multi-robot swarm coordination, and tactical fail-safe protocols.",
    bullets: ["GPS-Denied Navigation", "Swarm Coordination", "A* & DWA Path Generation", "Tactical Fail-Safe"],
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
  quote: "Pioneering indigenous defense mechatronics and empowering cadets through real-world hands-on robotics research.",
  specialization: "Robotics Architecture, Control Systems & Embedded Automation",
  avatarInitials: "AP",
  avatarBg: "bg-blue-600 text-white",
  linkedin: "https://linkedin.com",
};

// 2. Secretaries (Core executive leads)
export const secretaries: TeamMember[] = [
  {
    id: "sec-tejas",
    name: "Tejas Jape",
    role: "Secretary, CEAR",
    subRole: "Executive Lead • Hardware & Drive Systems",
    tier: "secretary",
    quote: "Relentless hardware iteration and mechanical robustness win national championships.",
    specialization: "Chassis Fabrication, Drive Telemetry, High-Torque Kinematics",
    avatarInitials: "TJ",
    avatarBg: "bg-blue-700 text-white",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    id: "sec-pragati",
    name: "Pragati",
    role: "Secretary, CEAR",
    subRole: "Executive Lead • Autonomous Software",
    tier: "secretary",
    quote: "Bridging mathematical control theory with high-speed autonomous field execution.",
    specialization: "Algorithmic Control, Sensor Calibration, Mission Architecture",
    avatarInitials: "PR",
    avatarBg: "bg-emerald-600 text-white",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
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
    quote: "Mastering fluid dynamics and ROS2 multi-agent autonomous drone coordination.",
    specialization: "ROS2 Nav2, Hydrodynamic Hulls, Swarm Telemetry",
    avatarInitials: "PN",
    avatarBg: "bg-blue-600 text-white",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    id: "js-aryan",
    name: "Aryan Singh",
    role: "Joint Secretary",
    subRole: "Domain Lead • Fabrication & Chassis Engineering",
    tier: "joint_secretary",
    quote: "Precision CNC milling, structural FEA, and rapid combat armor prototyping.",
    specialization: "CNC Milling, Stress Modeling, Hardened Combat Armor",
    avatarInitials: "AS",
    avatarBg: "bg-amber-600 text-white",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    id: "js-rohan",
    name: "Rohan Dangi",
    role: "Joint Secretary",
    subRole: "Domain Lead • Mechanical & Combat Systems",
    tier: "joint_secretary",
    quote: "High-durability sealed enclosures and torque transmission optimization.",
    specialization: "Thrust Vectoring, Sealed Enclosures, Power Distribution",
    avatarInitials: "RD",
    avatarBg: "bg-red-600 text-white",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    id: "js-drishti",
    name: "Drishti",
    role: "Joint Secretary",
    subRole: "Domain Lead • Sensors & Firmware",
    tier: "joint_secretary",
    quote: "Zero-latency sensor filtering and microsecond embedded communication.",
    specialization: "Optical Line Arrays, IMU Calibration, Low-Noise Telemetry",
    avatarInitials: "DR",
    avatarBg: "bg-emerald-600 text-white",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
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
    quote: "Seamless logistical orchestration for 500+ national competitors.",
    specialization: "National Event Direction, Outstation Logistics",
    avatarInitials: "NA",
    avatarBg: "bg-slate-700 text-white",
    linkedin: "https://linkedin.com",
  },
  {
    id: "contrib-aman",
    name: "Aman Derker",
    role: "Embedded Systems Specialist",
    subRole: "Custom PCB Architecture",
    tier: "contributor",
    quote: "Routing high-density 4-layer PCBs for harsh electromagnetic environments.",
    specialization: "MOSFET Motor Bridges, KiCad Routing, STM32",
    avatarInitials: "AD",
    avatarBg: "bg-blue-600 text-white",
    linkedin: "https://linkedin.com",
  },
  {
    id: "contrib-mantu",
    name: "Mantu Dutta",
    role: "Power & Electronics Lead",
    subRole: "Battery Management & Power Rails",
    tier: "contributor",
    quote: "Ensuring stable 60A burst power delivery without voltage sags.",
    specialization: "LiPo Safety Arrays, Regulated DC Rails, Telemetry",
    avatarInitials: "MD",
    avatarBg: "bg-amber-600 text-white",
    linkedin: "https://linkedin.com",
  },
  {
    id: "contrib-kshitij",
    name: "Kshitij",
    role: "Combat Robotics Specialist",
    subRole: "Drive Dynamics & Weaponry",
    tier: "contributor",
    quote: "Optimizing kinetic energy transfer and hardened steel defense wedges.",
    specialization: "Differential Drive Dynamics, Hardened Steel Wedges",
    avatarInitials: "KS",
    avatarBg: "bg-red-600 text-white",
    linkedin: "https://linkedin.com",
  },
  {
    id: "fy-vikramaditya",
    name: "Cadet Vikramaditya",
    role: "First Year Member",
    subRole: "Microcontrollers & Line Tracing",
    tier: "contributor",
    quote: "Tuning millisecond PID loops for sub-millimeter trajectory accuracy.",
    specialization: "ESP32, PID Algorithms, Sensor Arrays",
    avatarInitials: "VK",
    avatarBg: "bg-slate-800 text-white",
    linkedin: "https://linkedin.com",
  },
  {
    id: "fy-ananya",
    name: "Cadet Ananya Sharma",
    role: "First Year Member",
    subRole: "Computer Vision & ROS2",
    tier: "contributor",
    quote: "Real-time edge neural inference for fast obstacle segmentation.",
    specialization: "OpenCV, YOLO Inference, ROS2 Nodes",
    avatarInitials: "AS",
    avatarBg: "bg-emerald-700 text-white",
    linkedin: "https://linkedin.com",
  },
  {
    id: "fy-sahil",
    name: "Cadet Sahil Verma",
    role: "First Year Member",
    subRole: "CAD & Rapid Prototyping",
    tier: "contributor",
    quote: "Designing lightweight carbon-nylon 3D printed mechanical linkages.",
    specialization: "SolidWorks, FDM Prototyping, Kinematics",
    avatarInitials: "SV",
    avatarBg: "bg-blue-800 text-white",
    linkedin: "https://linkedin.com",
  },
  {
    id: "fy-tanya",
    name: "Cadet Tanya Rawat",
    role: "First Year Member",
    subRole: "Sensors & Telemetry",
    tier: "contributor",
    quote: "Building low-latency telemetry dashboards with wireless RF packets.",
    specialization: "Wireless RF, Telemetry UI, Sensor Calibration",
    avatarInitials: "TR",
    avatarBg: "bg-amber-700 text-white",
    linkedin: "https://linkedin.com",
  },
];

export const projects: Project[] = [
  {
    id: "robotic-arm",
    title: "6-DOF Articulated Robotic Arm",
    category: "Manipulation",
    tagline: "High-precision 6-DOF articulated robotic manipulator for surgical payload execution.",
    description:
      "A high-precision articulated robotic arm engineered for multi-axis dexterity, inverse kinematic path trajectory execution, and accurate pick-and-place automation.",
    longDescription:
      "Designed and fabricated from the ground up at the CEAR lab, this multi-degree-of-freedom robotic arm utilizes closed-loop servo telemetry and real-time kinematic calculations. Equipped with custom interchangeable end-effectors, tactile pressure sensors, and intuitive micro-step positional feedback, it achieves sub-millimeter repeatable precision.",
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
    demoUrl: "https://github.com/cear-ait/robotic-arm#demo",
  },
  {
    id: "jalpari",
    title: "Jalpari Amphibious Bot",
    category: "Aquatics",
    tagline: "Amphibious underwater robot winning 3rd Position & Unique Design Award at IIT Guwahati Techniche.",
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
    demoUrl: "https://github.com/cear-ait/jalpari-aquatic-bot#specs",
  },
  {
    id: "master-slave-arm",
    title: "Master-Slave Teleoperation Rig",
    category: "Manipulation",
    tagline: "Bilateral teleoperation system featuring real-time angular mirroring and sensory feedback for hazardous zones.",
    description:
      "A dual-unit teleoperation robotic arm system where master telemetry seamlessly commands a synchronized slave arm with tactile sensory feedback.",
    longDescription:
      "Built for hazardous ordnance disposal and remote laboratory operations, this system uses an ergonomic wearable master rig fitted with high-resolution magnetic rotary encoders. The slave unit reproduces human operator joint trajectories in real time over low-latency wireless protocols with collision mitigation algorithms.",
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
    demoUrl: "https://github.com/cear-ait/master-slave-teleop#telemetry",
  },
  {
    id: "pipe-climbing-bot",
    title: "Autonomous Pipe-Climbing Robot",
    category: "Autonomous",
    tagline: "Radial autonomous pipeline traversal robot for structural integrity audits and weld flaw detection.",
    description:
      "An automated inspection robot engineered with high-traction omnidirectional clamp wheels for vertical and inverted pipeline traversal and crack detection.",
    longDescription:
      "Engineered to inspect critical industrial pipeline infrastructures and defense conduit networks, this bot features magnetic and mechanical clamping arrays that allow it to scale vertical and curved pipes. An onboard ultrasonic flaw detector and micro-camera stream real-time telemetry back to an operator dashboard.",
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
    demoUrl: "https://github.com/cear-ait/pipe-climbing-bot#inspection",
  },
  {
    id: "drone-swarm",
    title: "Autonomous Swarm Quadcopters",
    category: "Aerial",
    tagline: "Synchronized multi-agent quadcopter swarm for GPS-denied tactical surveillance and 3D mapping.",
    description:
      "A synchronized fleet of lightweight carbon-fiber quadcopters running ROS2 Nav2 algorithms and optical flow positioning for coordinated aerial reconnaissance in GPS-denied environments.",
    longDescription:
      "Engineered for tactical indoor recon and perimeter security, each drone features an onboard companion processor running decentralized swarm flight controllers. Drones maintain dynamic flocking formation while mapping complex subterranean environments without satellite signals.",
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
    demoUrl: "https://github.com/cear-ait/swarm-quadcopters#swarm",
  },
  {
    id: "tactical-rover",
    title: "Tactical Autonomous Ground Rover",
    category: "Autonomous",
    tagline: "Rugged all-terrain autonomous rover featuring 3D LiDAR SLAM and dynamic obstacle evasion.",
    description:
      "A heavy-duty four-wheel independent drive rover engineered for high-torque tactical traversal, 3D point cloud mapping, and autonomous waypoint pursuit.",
    longDescription:
      "Built on a CNC-machined aluminum chassis with rocker-bogie suspension, this rover navigates hostile uneven terrain effortlessly. An onboard NVIDIA Jetson processor analyzes real-time Livox LiDAR point clouds to generate optimal traversal paths.",
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
    demoUrl: "https://github.com/cear-ait/tactical-ground-rover#rover",
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
    title: "CEAR Annual Inductions 2026-27",
    date: "October 2026",
    category: "Recruitment",
    status: "Upcoming",
    description:
      "Join the elite engineering league at AIT. Open to all first and second year enthusiasts passionate about AI, electronics, mechanical fabrication, and coding.",
    location: "Manekshaw Hall & CEAR Robotics Lab",
    ctaText: "Apply for Inductions",
  },
  {
    id: "arduino-bootcamp",
    title: "Microcontrollers & Embedded IoT Bootcamp",
    date: "November 2026",
    category: "Hands-on Workshop",
    status: "Ongoing",
    description:
      "Comprehensive multi-day workshop covering ESP32 architecture, PWM motor drivers, sensor interfacing, and building your first teleoperated rover.",
    location: "Robotics Hardware Lab, AIT",
    ctaText: "View Workshop Details",
  },
  {
    id: "ros2-workshop",
    title: "Autonomous Navigation & ROS2 Winter School",
    date: "December 2026",
    category: "Advanced Workshop",
    status: "Upcoming",
    description:
      "Master node communication, Gazebo simulation, SLAM mapping, and lidar point cloud navigation with senior mentors and defense practitioners.",
    location: "Computer Center 3, AIT",
    ctaText: "Pre-Register",
  },
  {
    id: "defense-symposium",
    title: "National Defense & Robotics Symposium 2026",
    date: "August 2026",
    category: "Symposium",
    status: "Completed",
    description:
      "Showcase of indigenous defense robotics, tactical swarm platforms, and keynote sessions with military tech leaders and industry pioneers.",
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
];

export const faqs = [
  {
    question: "Who can join the Centre of Excellence for AI and Robotics?",
    answer:
      "CEAR welcomes all students of Army Institute of Technology, Pune regardless of their branch. Whether you are in Computer Engineering, IT, Mechanical, or E&TC, there are specialized modules spanning hardware design, firmware, mechanical fabrication, and AI software.",
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
