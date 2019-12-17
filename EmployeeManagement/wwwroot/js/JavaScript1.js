/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

/* Create map instance */
var chart = am4core.create("chartdiv", am4maps.MapChart);

/* Set map definition */
chart.geodata = am4geodata_egyptLow;

/* Set projection */
chart.projection = new am4maps.projections.Miller();

/* Create map polygon series */
var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

//Set min/max fill color for each area
polygonSeries.heatRules.push({
    property: "fill",
    target: polygonSeries.mapPolygons.template,
    min: chart.colors.getIndex(10).brighten(1),
    max: chart.colors.getIndex(10).brighten(-0.3)
});

// Make map load polygon data (state shapes and names) from GeoJSON
polygonSeries.useGeodata = true;

polygonSeries.data = [
    {
        id: "EG-DK",
        value: 1111110
    },
    {
        id: "EG-ALX",
        value: 21111
    },
    {
        id: "EG-ASN",
        value: 300000
    },
    {
        id: "EG-AST",
        value: 2673
    },
    {
        id: "EG-BA",
        value: 4111144
    },
    {
        id: "EG-BH",
        value: 511111
    },
    {
        id: "EG-BNS",
        value: 61111
    },
    {
        id: "EG-C",
        value: 7010
    },
    {
        id: "EG-DT",
        value: 800
    },
    {
        id: "EG-FYM",
        value: 9
    },
    {
        id: "EG-GH",
        value: 1000
    },
    {
        id: "EG-GZ",
        value: 100
    },
    {
        id: "EG-IS",
        value: 120
    },
    {
        id: "EG-JS",
        value: 130
    },
    {
        id: "EG-KB",
        value: 14
    },
    {
        id: "EG-KFS",
        value: 150
    },
    {
        id: "EG-KN",
        value: 160
    },
    {
        id: "EG-LX",
        value: 170
    },
    {
        id: "EG-MNF",
        value: 180
    },
    {
        id: "EG-MT",
        value: 190
    },
    {
        id: "EG-PTS",
        value: 200
    },
    {
        id: "EG-SHG",
        value: 210
    },
    {
        id: "EG-SHR",
        value: 220
    },
    {
        id: "EG-SIN",
        value: 330
    },
    {
        id: "EG-SUZ",
        value: 2400
    },
    {
        id: "EG-WAD",
        value: 25
    }
];
// Set up heat legend
let heatLegend = chart.createChild(am4maps.HeatLegend);
heatLegend.series = polygonSeries;
heatLegend.align = "right";
heatLegend.width = am4core.percent(25);
heatLegend.marginRight = am4core.percent(4);
heatLegend.minValue = 0;
heatLegend.maxValue = 40000000;
heatLegend.valign = "bottom";

// Set up custom heat map legend labels using axis ranges
var minRange = heatLegend.valueAxis.axisRanges.create();
minRange.value = heatLegend.minValue;
minRange.label.text = "Little";
var maxRange = heatLegend.valueAxis.axisRanges.create();
maxRange.value = heatLegend.maxValue;
maxRange.label.text = "A lot!";

// Blank out internal heat legend value axis labels
heatLegend.valueAxis.renderer.labels.template.adapter.add("text", function (labelText) {
    return "";
});

/* Configure series */
var polygonTemplate = polygonSeries.mapPolygons.template;
//polygonTemplate.applyOnClones = true;
polygonTemplate.togglable = true;
polygonTemplate.tooltipText = "{name}:{value}";
polygonTemplate.nonScalingStroke = true;
polygonTemplate.strokeOpacity = 0.5;
polygonTemplate.fill = chart.colors.getIndex(10);
var lastSelected;
polygonTemplate.events.on("hit", function (ev) {
    if (lastSelected) {
        // This line serves multiple purposes:
        // 1. Clicking a country twice actually de-activates, the line below
        //    de-activates it in advance, so the toggle then re-activates, making it
        //    appear as if it was never de-activated to begin with.
        // 2. Previously activated countries should be de-activated.
        lastSelected.isActive = false;
    }
    ev.target.series.chart.zoomToMapObject(ev.target);
    if (lastSelected !== ev.target) {
        lastSelected = ev.target;
    }
})


/* Create selected and hover states and set alternative fill color */
var ss = polygonTemplate.states.create("active");
ss.properties.fill = chart.colors.getIndex(9);

var hs = polygonTemplate.states.create("hover");
hs.properties.fill = chart.colors.getIndex(11);

// Hide Antarctica
polygonSeries.exclude = ["AQ"];

// Small map
chart.smallMap = new am4maps.SmallMap();
// Re-position to top right (it defaults to bottom left)
chart.smallMap.align = "right";
chart.smallMap.valign = "top";
chart.smallMap.series.push(polygonSeries);

// Zoom control
chart.zoomControl = new am4maps.ZoomControl();

var homeButton = new am4core.Button();
homeButton.events.on("hit", function () {
    chart.goHome();
});

homeButton.icon = new am4core.Sprite();
homeButton.padding(7, 5, 7, 5);
homeButton.width = 30;
homeButton.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
homeButton.marginBottom = 10;
homeButton.parent = chart.zoomControl;
homeButton.insertBefore(chart.zoomControl.plusButton);