<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Hash Table Visualization</title>
  <script src="https://unpkg.com/gojs/release/go.js"></script>
  <style>
    html, body {
      height: 100%;
      margin: 0;
      overflow: hidden;
      font-family: sans-serif;
    }
    #myDiagramDiv {
      width: 100%;
      height: 100vh;
      background-color: #f9f9f9;
    }
  </style>
</head>
<body>
  <div id="myDiagramDiv"></div>

  <script>
    const $ = go.GraphObject.make;

    const diagram = $(go.Diagram, "myDiagramDiv", {
      initialContentAlignment: go.Spot.Center,
      layout: $(go.LayeredDigraphLayout, { direction: 0, layerSpacing: 40 })
    });

    // Шаблон для узлов хэш-таблицы (записей)
    diagram.nodeTemplate = $(
      go.Node, "Auto",
      $(go.Shape, "RoundedRectangle", { fill: "lightyellow", strokeWidth: 1 }),
      $(go.Panel, "Table",
        { padding: 4 },
        $(go.RowColumnDefinition, { column: 0, width: 100 }),
        $(go.RowColumnDefinition, { column: 1, width: 120 }),
        $(go.TextBlock, { row: 0, column: 0, margin: 2, font: "bold 12px sans-serif" },
          new go.Binding("text", "key")),
        $(go.TextBlock, { row: 0, column: 1, margin: 2 },
          new go.Binding("text", "value"))
      )
    );

    // Шаблон для bucket'ов
    diagram.nodeTemplateMap.add("Bucket",
      $(go.Node, "Auto",
        $(go.Shape, "Rectangle", { fill: "#d0eaff", stroke: "#007acc" }),
        $(go.TextBlock, {
          margin
