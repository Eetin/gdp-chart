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
	
	d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json', function (d) {
	  barChart(d.data);
	});
	
	var barChart = function barChart(myData) {
	
	  var margin = { top: 50, right: 30, bottom: 100, left: 60 };
	
	  var width = 900 - margin.right - margin.left,
	      height = 600 - margin.top - margin.bottom,
	      barWidth = 5,
	      barOffset = 2;
	
	  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	
	  var tempColor = void 0;
	
	  var yScale = d3.scaleLinear().domain([0, d3.max(myData, function (d) {
	    return d[1];
	  })]).range([0, height]);
	
	  var xScale = d3.scaleBand().domain(d3.range(0, myData.length)).range([0, width]);
	
	  var color = d3.scaleLinear().domain([0, myData.length * .33, myData.length * .66, myData.length]).range(['#B58929', '#C61C6F', '#268BD2', '#85992C']);
	
	  var tooltip = d3.select('body').append('div').classed('tooltip', true).style('position', 'absolute').style('padding', '2px 10px').style('display', 'none').style('border-radius', '5px');
	
	  tooltip.append('div').classed('gdp', true);
	  tooltip.append('div').classed('year', true);
	
	  var myChart = d3.select('#chart').append('svg').classed('center-block', true).attr('width', width + margin.right + margin.left).attr('height', height + margin.top + margin.bottom).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
	  // .style('background', '#C9D7D6')
	  .selectAll('rect').data(myData).enter().append('rect').style('fill', function (d, i) {
	    return color(i);
	  }).attr('width', xScale.bandwidth()).attr('x', function (d, i) {
	    return xScale(i);
	  }).attr('height', 0).attr('y', height).on('mouseover', function (d) {
	
	    tooltip.transition().style('display', 'block').style('opacity', 1);
	
	    d3.select('.tooltip .gdp').html(function () {
	      return '$' + d[1] + ' Billion';
	    }).style('font-size', '1.2em').style('font-weight', 'bold');
	    d3.select('.tooltip .year').html(function () {
	      var date = d[0].split('-');
	      return months[parseInt(date[1]) - 1] + ' ' + date[0];
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
	  var range = d3.range(0, myData.length, 16);
	  var hGuideScale = d3.scaleBand().domain(range).range([0, width]);
	  var hAxis = d3.axisBottom(hGuideScale).scale(xScale).tickFormat(function (d, i) {
	    return myData[range[i]][0].slice(0, 4);
	  }).tickValues(range);
	  var hGuide = d3.select('svg').append('g');
	  hAxis(hGuide);
	  hGuide.attr('transform', 'translate(' + margin.left + ', ' + (height + margin.top) + ')');
	
	  var header = d3.select('svg').append('text').classed('header', true).text('Gross Domestic Product, USA').attr('transform', 'translate(' + (width / 2 + margin.left) + ', ' + margin.top + ')').style('text-anchor', 'middle').style('font-size', '2em');
	
	  var gdpText = d3.select('svg').append('text').classed('gdpText', true).text('GDP, Billions of US Dollars').attr('transform', 'translate(' + (margin.left + 20) + ', ' + margin.top + ') rotate(-90)').style('text-anchor', 'end');
	
	  var bottomText = d3.select('svg').append('text').classed('bottom-text', true).text('Units: Billions of Dollars Seasonal Adjustment: Seasonally Adjusted Annual Rate Notes: A Guide to the National Income and Product Accounts of the United States (NIPA) - (http://www.bea.gov/national/pdf/nipaguid.pdf)').call(wrap, width).attr('transform', 'translate(' + (width / 2 + margin.left) + ', ' + (height + margin.top + margin.bottom / 3 * 2) + ')').attr('text-anchor', 'middle').attr('width', width);
	};
	
	function wrap(text, width) {
	  text.each(function () {
	    var text = d3.select(this),
	        words = text.text().split(/\s+/).reverse(),
	        word,
	        line = [],
	        lineNumber = 0,
	        lineHeight = 1.1,
	        // ems
	    y = text.attr("y"),
	        dy = parseFloat(text.attr("dy") || 0),
	        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
	    while (word = words.pop()) {
	      line.push(word);
	      tspan.text(line.join(" "));
	      if (tspan.node().getComputedTextLength() > width) {
	        line.pop();
	        tspan.text(line.join(" "));
	        line = [word];
	        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
	      }
	    }
	  });
	}

/***/ }
/******/ ]);
//# sourceMappingURL=index_bundle.js.map