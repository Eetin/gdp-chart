let myData
d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json', d => {
  myData = d.data
  // render()
  // svgRender()
  simpleBarChart()
})

const simpleBarChart = () => {

  const margin = { top: 30, right: 30, bottom: 40, left: 50 }

  const width = 600 - margin.right - margin.left,
    height = 400 - margin.top - margin.bottom,
    barWidth = 5,
    barOffset = 2

  let tempColor

  let yScale = d3.scaleLinear()
    .domain([0, d3.max(myData, d => d[1])])
    .range([0, height])

  let xScale = d3.scaleBand()
    .domain(d3.range(0, myData.length))
    .range([0, width])

  let color = d3.scaleLinear()
    .domain([0, myData.length*.33, myData.length*.66, myData.length])
    .range(['#B58929', '#C61C6F', '#268BD2', '#85992C'])

  let tooltip = d3.select('body')
    .append('div')
    .classed('tooltip', true)
    .style('position', 'absolute')
    .style('padding', '0 10px')
    .style('background', 'white')
    .style('display', 'none')

  tooltip.append('div')
    .classed('year', true)
  tooltip.append('div')
    .classed('gdp', true)

  let myChart = d3.select('#chart')
    .append('svg')
    .style('background', "#E7E0CB")
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    // .style('background', '#C9D7D6')
    .selectAll('rect')
    .data(myData)
    .enter().append('rect')
    .style('fill', (d, i) => color(i))
    .attr('width', xScale.bandwidth())
    .attr('x', (d, i) => xScale(i))
    .attr('height', 0)
    .attr('y', height)
    .on('mouseover', function(d) {

      tooltip.transition()
        .style('display', 'block')

      d3.select('.tooltip .year').html(() => 'Date: ' + d[0])
      d3.select('.tooltip .gdp').html(() => 'GDP: ' + d[1])

      tooltip
        .style('left', (d3.event.pageX - 50) + 'px')
        .style('top', (d3.event.pageY - 50) + 'px')

      tempColor = this.style.fill
      d3.select(this)
        .style('opacity', 0.5)
        .style('fill', 'yellow')
    })
    .on('mouseout', function(d) {
      tooltip.transition()
        .style('display', 'none')

      d3.select(this)
        .style('opacity', 1)
        .style('fill', tempColor)
    })

  myChart.transition()
    .attr('height', d => yScale(d[1]))
    .attr('y', d => height - yScale(d[1]))
    .delay((d, i) => i * 5)
    .duration(1000)
    .ease(d3.easeElastic)

  let vGuideScale = d3.scaleLinear()
    .domain([0, d3.max(myData, d => d[1])])
    .range([height, 0])
  let vAxis = d3.axisLeft(vGuideScale).ticks(10)
  let vGuide = d3.select('svg').append('g')
  vAxis(vGuide)
  vGuide.attr('transform', 'translate('+ margin.left +', ' + margin.top + ')')

  // let hGuideScale = d3.scaleLinear()
  //   .domain([0, myData.length])
  //   .range([0, width])
  let hAxis = d3.axisBottom(xScale)
    .tickValues(xScale.domain().filter((d, i) => !(i % (myData.length/5))))
  let hGuide = d3.select('svg').append('g')
  hAxis(hGuide)
  hGuide.attr('transform', 'translate(' + margin.left + ', ' + (height + margin.top) + ')')

}
