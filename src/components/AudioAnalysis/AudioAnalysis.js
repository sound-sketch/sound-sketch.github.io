import React, {Component} from "react";
import json5 from "json5";
import "./AudioAnalysis.css";
import { getColorPalette } from "./ColorPalettes";
import p5 from "p5";

class AudioAnalysis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audioAnalysis: props.audioAnalysis,
            audioAnalysisStr: json5.stringify(props.audioAnalysis)
        };
        this.myRef = React.createRef();
    }

    Sketch = (p) => {
        p.setup = () => {
            this.canvas_width = 1000;
            this.canvas_height = 500;
            
            // Colors determined by valence and energy
            this.background_colors = getColorPalette(
                this.state.audioAnalysis.valence, this.state.audioAnalysis.energy
            );

            p.createCanvas(this.canvas_width, this.canvas_height);
            
            // Distance btwn each horizontal location
            this.xspacing = 16;

            // Width of entire wave
            this.wave_width = this.canvas_width + this.xspacing;

            // Start angle
            this.theta = 0.0;
            
            // Height of wave
            this.amplitude = 100.0;

            // Value for incrementing x
            this.dx = (p.TWO_PI / 500.0) * 16;

            // Array stores height values for the wave
            this.yvalues = new Array(p.floor(this.wave_width / this.xspacing));
        }

        p.draw = () => {
            let c1 = p.color(this.background_colors[0][0], this.background_colors[0][1], this.background_colors[0][2]);
            let c2 = p.color(this.background_colors[1][0], this.background_colors[1][1], this.background_colors[1][2]);
            let c3 = p.color(this.background_colors[2][0], this.background_colors[2][1], this.background_colors[2][2]);
            for (let i = 90; i < 90 + this.canvas_height; i++) {
                let inter = p.map(i, 0, 0 + this.canvas_height, 0, 1);
                let c1c2 = p.lerpColor(c1, c2, inter);
                let c2c3 = p.lerpColor(c2, c3, inter);
                let finalC = p.lerpColor(c1c2, c2c3, inter);
                p.stroke(finalC);
                p.line(0, i, 0 + this.canvas_width, i);
            }
            // Increment angle each time (try diff values for angular velocity)s
            this.theta += 0.06;

            // Calc y value for every x
            let x = this.theta;
            for (let i = 0; i < this.yvalues.length; ++i) {
                this.yvalues[i] = p.sin(x) * this.amplitude;
                x += this.dx;
            }
            p.noStroke();
            p.fill(255);

            for (let x = 0; x < this.yvalues.length; ++x) {
                p.ellipse(x * this.xspacing, this.canvas_height / 2 + this.yvalues[x], this.xspacing, this.xspacing);
            }
        }
    }

    componentDidMount() {
        this.myP5 = new p5(this.Sketch, this.myRef.current)
    }

    render() {
        return(
            <div className="AudioAnalysis">
                <label>{this.state.audioAnalysisStr}</label>
                <div ref={this.myRef}> </div>
            </div>
        )
    }
}

export default AudioAnalysis;