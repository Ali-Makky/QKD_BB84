<p align="center">
    <img src="./qkd_bb84.png" align="center" width="50%">
</p>
<p align="center"><h1 align="center">QKD BB84 Simulator</h1></p>

<p align="center">Built with the tools and technologies:</p>
<p align="center">
	<img src="https://img.shields.io/badge/npm-CB3837.svg?style=default&logo=npm&logoColor=white" alt="npm">
	<img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=default&logo=HTML5&logoColor=white" alt="HTML5">
	<img src="https://img.shields.io/badge/CSS3-1572B6.svg?style=default&logo=CSS3&logoColor=white" alt="CSS3">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=default&logo=JavaScript&logoColor=black" alt="JavaScript">
<img src="https://img.shields.io/badge/PixiJS-FF7102.svg?style=default&logo=pixijs&logoColor=white" alt="PixiJS">
	<img src="https://img.shields.io/badge/Vite-646CFF.svg?style=default&logo=Vite&logoColor=white" alt="Vite">
</p>
<br>


##  Overview

This simulator was built as project for [COE466](https://faculty.kfupm.edu.sa/COE/mfelemban/COE466/241/index.html) course at KFUPM.
It provides a simulation of the [BB84](https://en.wikipedia.org/wiki/BB84#:~:text=BB84%20is%20a%20quantum%20key,the%20first%20quantum%20cryptography%20protocol.) QKD protocol, which is a foundational quantum cryptography method for securely distributing encryption keys between two parties. The simulator demonstrates the principles of quantum key distribution and allows users to explore the mechanics of the BB84 protocol.

#### Go & Try it!
- https://ali-makky.github.io/QKD_BB84/
---

##  Features

- Simulation of the BB84 protocol steps, including:
  - Preparation and transmission of quantum bits (qubits)
  - Measurement of qubits with random bases
- Visualization of the quantum states and measurement outcomes
- Key validation process to generate a shared secret key, and discover potential eavesdropping
 
---

##  Project Structure

```sh
└── QKD_BB84/
    ├── index.html
    ├── package.json
    ├── public
    │   ├── img/
    │   └── style.css
    ├── src
    │   ├── backend/
    │   ├── frontend/
    │   └── main.js
    └── vite.config.js
```


---
##  Getting Started
To run the simulator locally, follow these steps:


###  Installation

1. **Clone the QKD_BB84 repository:**
```sh
❯ git clone https://github.com/Ali-Makky/QKD_BB84.git
```

2. **Navigate to the project directory:**
```sh
❯ cd QKD_BB84
```

3. **Install the project dependencies:**
```sh
❯ npm install
```


###  Usage
Run QKD_BB84 using the following command:

```sh
❯ npx vite
```
Open your browser and navigate to `http://localhost:<prot-number>` to access the simulator.

---

##  License

This project is under the **MIT** License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/mit/) file.

---

##  Acknowledgments

- This project draws inspiration from [QuVis](https://www.st-andrews.ac.uk/physics/quvis/simulations_html5/sims/BB84_photons/BB84_photons.html) and includes some enhancements.

---
