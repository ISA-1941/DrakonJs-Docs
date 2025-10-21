<!DOCTYPE html>
<html>
<head>
  <title>GoJS Demo</title>
  <!-- Подключаем GoJS -->
  <script src="https://unpkg.com/gojs/release/go.js"></script>
  <style>
    #myDiagramDiv {
      width: 500px;
      height: 300px;
      border: 1px solid #ccc;
    }
  </style>
</head>
<body>
  <!-- Контейнер для диаграммы -->
  <div id="myDiagramDiv"></div>

  <script>
    // Инициализация диаграммы после загрузки библиотеки
    const $ = go.GraphObject.make;

    const myDiagram = $(
      go.Diagram,
      "myDiagramDiv",
      {
        "undoManager.isEnabled": true // Включение отмены действий
      }
    );

    // Шаблон узла
    myDiagram.nodeTemplate = $(
      go.Node,
      "Auto",
      $(
        go.Shape,
        "Rectangle",
        { fill: "lightblue", stroke: "darkblue" }
      ),
      $(
        go.TextBlock,
        { margin: 5, font: "14px sans-serif" },
        new go.Binding("text", "key")
      )
    );

    // Data 
    myDiagram.model = new go.GraphLinksModel(
      [
        { key: "Root" },
        { key: "Child 1" },
        { key: "Child 2" }
        { key: "Child 3" },
        { key: "Child 4" }
      ],
      [
        { from: "Root", to: "Child 1" },
        { from: "Child 2", to: "Child 3" }
        { from: "Child 1", to: "Child 4" },
        { from: "Child 3", to: "Child 1" }
      ]
    );
  </script>
</body>
</html>