import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";

cytoscape.use(dagre);

var relation = {
    nodes: [1, 2, 3, 4, 5],
    edges: [
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [1, 3],
    [1, 4],
    [1, 5],
    [2, 4],
    [2, 5],
    [3, 4],
    [3, 5],
    [4, 5]
    ]
};

function find_hasse_edges(r) {
    // TODO: add code to find edges in hasse diagram
    return ["1-2", "2-3", "3-4", "4-5"];
}

var hasse_edges = find_hasse_edges(relation.nodes);
// Create cytoscape nodes
var cy_nodes = relation.nodes.map((x) => {
    return { data: { id: `${x}` } };
});

var cy_edges = relation.edges.map((x) => {
    return {
        data: { id: `${x[0]}-${x[1]}`, source: `${x[0]}`, target: `${x[1]}` }
    };
});

var cy = (window.cy = cytoscape({
    container: document.getElementById("cy"),

    boxSelectionEnabled: false,
    autounselectify: true,

    layout: {
        name: "dagre"
    },

    style: [
    {
        selector: "node",
        style: {
            // content: "data(id)",
            "text-opacity": 0.5,
            "text-valign": "center",
            "text-halign": "right",
            "background-color": "#11479e"
        }
    },

    {
        selector: "edge",
        style: {
            "curve-style": "bezier",
            width: 4,
            "target-arrow-shape": "triangle",
            "line-color": "#9dbaea",
            "target-arrow-color": "#9dbaea"
        }
    },
    {
        selector: "edge.red",
        style: {
            "line-color": "red",
            "target-arrow-color": "red"
        }
    },
    {
        selector: "edge.green",
        style: {
            "line-color": "green",
            "target-arrow-color": "green"
        }
    }
    ],

    elements: {
        nodes: cy_nodes,
        edges: cy_edges
    }
}));

cy.on("click", "edge", function (evt) {
    console.log("clicked " + this.id());
    // console.log(e);
    if (hasse_edges.includes(this.id())) {
        this.addClass("green");
    } else {
    this.addClass("red");
    }
    // console.log(this.source().id());
    // console.log(evt);
});
