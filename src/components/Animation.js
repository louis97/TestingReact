import React, { Component } from "react";
import * as d3 from "d3";

class Animation extends Component {

    componentDidMount() {
        const data = [
            { name: "Medellín", index2005: 3, index2006: 33 },
            { name: "Cali", index2005: 39, index2006: 45 },
            { name: "Bogotá", index2005: 7, index2006: 31 },
            { name: "Pereira", index2005: 35, index2006: 36 },
            { name: "Bucaramanga", index2005: 16, index2006: 23 },
            { name: "Cúcuta", index2005: 45, index2006: 45 },
            { name: "Armenia", index2005: 6, index2006: 16 }
        ];
        this.drawChart(data);
    }

    drawChart(data) {
        const canvas = d3.select(this.refs.canvas);
        let mayor2005 = 0;
        let mayor2006 = 0;
        data.forEach(element => {
            mayor2005 = element.index2005 >= mayor2005 ? element.index2005 : mayor2005;
            mayor2006 = element.index2006 >= mayor2006 ? element.index2006 : mayor2006;
        });

        const width = 700;
        const height = 500;
        const margin = { top: 10, left: 50, bottom: 40, right: 10 };
        const iwidth = width - margin.left - margin.right;
        const iheight = height - margin.top - margin.bottom;

        const svg = canvas.append("svg");
        svg.attr("width", width);
        svg.attr("height", height);

        let g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
            .domain(data.map(d => d.name))
            .range([0, iwidth])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, mayor2005])
            .range([iheight, 0]);

        const bars = g.selectAll("rect").data(data);

        const barras = bars.enter().append("rect")
            .attr("class", "bar")
            .style("fill", "steelblue")
            .attr("x", d => x(d.name))
            .attr("y", d => y(d.index2005))
            .attr("width", x.bandwidth())
            .attr("height", d => iheight - y(d.index2005));

        g.append("g")
            .classed("x--axis", true)
            .call(d3.axisBottom(x))
            .attr("transform", `translate(0, ${iheight})`);

        g.append("g")
            .classed("y--axis", true)
            .call(d3.axisLeft(y));

        d3.select("#start").on("click", function () {
            barras.transition()
                .style("fill", "steelblue")
                .attr("y", d => y(d.index2005))
                .attr("height", d => iheight - y(d.index2005));
        });

        d3.select("#reset").on("click", function () {
            barras.transition()
                .style("fill", "gold")
                .attr("y", d => y(d.index2006))
                .attr("height", d => iheight - y(d.index2006));
        });
    }

    render() {
        return (<div>
            <div ref="canvas"></div>
            <button id="start">index 2005</button>
            <button id="reset">index 2006</button>
        </div>
        );
    }
}

export default Animation;