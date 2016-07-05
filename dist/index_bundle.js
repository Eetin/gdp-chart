/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	var myData = void 0;
	d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json', function (d) {
	  myData = d.data;
	  // render()
	  // svgRender()
	  simpleBarChart();
	});
	
	var simpleBarChart = function simpleBarChart() {
	
	  var margin = { top: 30, right: 30, bottom: 40, left: 50 };
	
	  var width = 600 - margin.right - margin.left,
	      height = 400 - margin.top - margin.bottom,
	      barWidth = 5,
	      barOffset = 2;
	
	  var tempColor = void 0;
	
	  var yScale = d3.scaleLinear().domain([0, d3.max(myData, function (d) {
	    return d[1];
	  })]).range([0, height]);
	
	  var xScale = d3.scaleBand().domain(d3.range(0, myData.length)).range([0, width]);
	
	  var color = d3.scaleLinear().domain([0, myData.length * .33, myData.length * .66, myData.length]).range(['#B58929', '#C61C6F', '#268BD2', '#85992C']);
	
	  var tooltip = d3.select('body').append('div').classed('tooltip', true).style('position', 'absolute').style('padding', '0 10px').style('background', 'white').style('display', 'none');
	
	  tooltip.append('div').classed('year', true);
	  tooltip.append('div').classed('gdp', true);
	
	  var myChart = d3.select('#chart').append('svg').style('background', "#E7E0CB").attr('width', width + margin.right + margin.left).attr('height', height + margin.top + margin.bottom).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
	  // .style('background', '#C9D7D6')
	  .selectAll('rect').data(myData).enter().append('rect').style('fill', function (d, i) {
	    return color(i);
	  }).attr('width', xScale.bandwidth()).attr('x', function (d, i) {
	    return xScale(i);
	  }).attr('height', 0).attr('y', height).on('mouseover', function (d) {
	
	    tooltip.transition().style('display', 'block');
	
	    d3.select('.tooltip .year').html(function () {
	      return 'Date: ' + d[0];
	    });
	    d3.select('.tooltip .gdp').html(function () {
	      return 'GDP: ' + d[1];
	    });
	
	    tooltip.style('left', d3.event.pageX - 50 + 'px').style('top', d3.event.pageY - 50 + 'px');
	
	    tempColor = this.style.fill;
	    d3.select(this).style('opacity', 0.5).style('fill', 'yellow');
	  }).on('mouseout', function (d) {
	    tooltip.transition().style('display', 'none');
	
	    d3.select(this).style('opacity', 1).style('fill', tempColor);
	  });
	
	  myChart.transition().attr('height', function (d) {
	    return yScale(d[1]);
	  }).attr('y', function (d) {
	    return height - yScale(d[1]);
	  }).delay(function (d, i) {
	    return i * 5;
	  }).duration(1000).ease(d3.easeElastic);
	
	  var vGuideScale = d3.scaleLinear().domain([0, d3.max(myData, function (d) {
	    return d[1];
	  })]).range([height, 0]);
	  var vAxis = d3.axisLeft(vGuideScale).ticks(10);
	  var vGuide = d3.select('svg').append('g');
	  vAxis(vGuide);
	  vGuide.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
	
	  // let hGuideScale = d3.scaleLinear()
	  //   .domain([0, myData.length])
	  //   .range([0, width])
	  var hAxis = d3.axisBottom(xScale).tickValues(xScale.domain().filter(function (d, i) {
	    return !(i % (myData.length / 5));
	  }));
	  var hGuide = d3.select('svg').append('g');
	  hAxis(hGuide);
	  hGuide.attr('transform', 'translate(' + margin.left + ', ' + (height + margin.top) + ')');
	};

/***/ }
/******/ ]);
//# sourceMappingURL=index_bundle.js.map