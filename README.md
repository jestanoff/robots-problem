# Robot Movement Simulator

This application simulates robots moving on a rectangular surface, following specific commands while avoiding falling off the edges.

## Prerequisites

- Node.js (v20 or higher)
- npm

## Setup

1. Clone the repository:
```bash
git clone https://github.com/jestanoff/robots-problem.git
cd robots-problem
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

Run the program:
```bash
npm run robots -- --input="$(cat << 'EOF'
5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL
EOF
)"
```

First line: grid dimensions (width height)
Following lines: robot initial position and commands
- Initial position: X Y DIRECTION (where direction is N, S, E, or W)
- Instruction: sequence of F (forward), L (turn left), R (turn right)

## Running Tests

```bash
npm test
npm run test:watch
```
