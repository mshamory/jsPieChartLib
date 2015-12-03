// Check if PieChartLib.js is included and the correct version
if (typeof PIECHARTLIB == "undefined" || PIECHARTLIB != "0.1.0") {
  alert("Error: This demo requires PieChartLib.js version 0.1.0 to function properly!");
}

// When the window loads, set up the necessary objects
var mychart, ctx;
window.onload = function() {
  ctx = document.getElementById('display').getContext("2d");
  mychart = new PieChart(ctx.canvas, ctx.canvas.height / 2 - 80, ctx.canvas.width / 2, ctx.canvas.height / 2);
  ctx = document.getElementById('display').getContext("2d");
  resizeCanvas();
  addItem();
}

function draw() {
  // Clear the current list of items
  mychart.items = new Array();

  // Get the items that need to be drawn
  var items = document.getElementById('items').getElementsByClassName('item');

  // For each item on the pie chart
  for (var i = 0; i < items.length; i++) {
    var dataItem = new PieChartDataItem(0, "");
    // Check that the percentage entered is a number
    var arcAngle = items[i].getElementsByTagName('input')[2].value;
    if (!isNumeric(arcAngle) || arcAngle > 100 || arcAngle < 0) {
      console.log("Item " + i + " does not have a proper percentage value!");
    } else {
      dataItem.percentOfPie = arcAngle;
      dataItem.color = items[i].getElementsByTagName('input')[0].value;
      mychart.items.push(dataItem);
    }
  }

  mychart.draw();
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}


function addItem() {
  var content = document.querySelector('template').content;
  content.querySelector('input:nth-child(2)').value = "Item " + (document.getElementById('items').getElementsByClassName('item').length + 1);
  document.getElementById('items').appendChild(document.importNode(content, true));
  draw();
}

function removeItem(item) {
  item = item.parentNode;
  item.parentNode.removeChild(item);
  draw();
}

function resizeCanvas() {
  var content = document.getElementById('content');
  if (content == null) {
    return;
  }
  var display = document.getElementById('display');
  var size = Math.min(content.clientHeight, content.clientWidth);

  if (display.clientHeight < content.clientHeight) {
    display.style.marginTop = (content.clientHeight - display.clientHeight) / 2 + "px";
  } else {
    display.style.marginTop = "0px";
  }

  // Scale the canvas (later ask for size)
  size *= 2;
  mychart.radius = size / 2 - 80;
  mychart.center.x = size / 2;
  mychart.center.y = size / 2;
  ctx.canvas.height = size;
  ctx.canvas.width = size;
  draw();
}

function YScroll() {
  var YPos = window.pageYOffset;
  var content = document.getElementById('content');
  content.style.top = 0 - YPos/2 + "px";
}

function downloadImage() {
  document.getElementById('download').href = ctx.canvas.toDataURL('image/png');
}

window.addEventListener("scroll", YScroll);

window.onresize = resizeCanvas();
