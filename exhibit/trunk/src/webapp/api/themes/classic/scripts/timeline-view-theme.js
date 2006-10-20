/*==================================================
 *  Exhibit.TimelineView classic theme
 *==================================================
 */
 
Exhibit.TimelineView.theme = new Object();

Exhibit.TimelineView.theme.constructDom = function(
    exhibit,
    div,
    onClearFilters
) {
    var l10n = Exhibit.TimelineView.l10n;
    var template = {
        elmt:       div,
        children: [
            {   tag:        "div",
                className:  "exhibit-collectionView-header",
                children: [
                    {   tag:    "div",
                        field:  "noResultDiv",
                        style:  { display: "none" },
                        children: Exhibit.ViewPanel.l10n.createNoResultsTemplate(
                            "exhibit-collectionView-header-count",
                            "exhibit-collectionView-header-types",
                            "exhibit-collectionView-header-details"
                        )
                    },
                    {   tag:    "div",
                        field:  "resultsDiv",
                        style:  { display: "none" },
                        children: [
                            {   tag:    "div",
                                children: Exhibit.ViewPanel.l10n.createResultsSummaryTemplate(
                                    "exhibit-collectionView-header-count",
                                    "exhibit-collectionView-header-types",
                                    "exhibit-collectionView-header-details",
                                    exhibit.makeActionLink(
                                        Exhibit.ViewPanel.l10n.resetFiltersLabel, 
                                        onClearFilters
                                    )
                                )
                            },
                            {   tag:        "div",
                                className:  "exhibit-timelineView-plottableDetails",
                                field:      "plottableDiv"
                            }
                        ]
                    }
                ]
            },
            {   tag:        "div",
                className:  "exhibit-timelineView-mapContainer",
                children: [
                    {   tag:        "div",
                        className:  "exhibit-timelineView-timeline",
                        field:      "timelineDiv"
                    }
                ]
            },
            {   tag: "div",
                className: "exhibit-timelineView-resizer",
                field: "resizerDiv"
            },
            {   tag: "div",
                className:  "exhibit-timelineView-legend",
                field: "legendDiv"
            }
        ]
    };
    
    var dom = SimileAjax.DOM.createDOMFromTemplate(document, template);
    dom.setCounts = function(resultsCount, plottableCount, originalCount) {
        if (resultsCount == 0) {
            dom.noResultDiv.style.display = "block";
            dom.resultsDiv.style.display = "none";
        } else {
            dom.noResultDiv.style.display = "none";
            dom.resultsDiv.style.display = "block";
        }
        
        if (originalCount != resultsCount) {
            dom.noFilterDetailsSpan.style.display = "none";
            dom.filteredDetailsSpan.style.display = "inline";
        } else {
            dom.noFilterDetailsSpan.style.display = "inline";
            dom.filteredDetailsSpan.style.display = "none";
        }
        
        if (plottableCount != resultsCount) {
            dom.plottableDiv.style.display = "block";
            dom.plottableDiv.innerHTML = l10n.formatMappableCount(plottableCount);
        } else {
            dom.plottableDiv.style.display = "none";
        }
        
        dom.itemCountSpan.innerHTML = resultsCount;
        dom.originalCountSpan.innerHTML = originalCount;
    };
    dom.setTypes = function(typeLabels) {
        var typeLabel = (typeLabels.length > 0 && typeLabels.length <= 3) ?
            Exhibit.l10n.composeListString(typeLabels) :
            Exhibit.Database.l10n.itemType.pluralLabel;
            
        dom.typesSpan.innerHTML = typeLabel;
    };
    dom.getTimelineDiv = function() {
        return dom.timelineDiv;
    };
    dom.clearLegend = function() {
        dom.legendDiv.innerHTML = "<table cellspacing='10'><tr valign='top'></tr></table>";
    };
    dom.addLegendBlock = function(blockDom) {
        var tr = dom.legendDiv.firstChild.rows[0];
        var td = tr.insertCell(tr.cells.length);
        td.appendChild(blockDom.elmt);
    };
    
    SimileAjax.WindowManager.registerForDragging(
        dom.resizerDiv,
        {   onDragStart: function() {
                this._height = dom.timelineDiv.offsetHeight;
            },
            onDragBy: function(diffX, diffY) {
                this._height += diffY;
                dom.timelineDiv.style.height = Math.max(50, this._height) + "px";
            },
            onDragEnd: function() {
                dom.timeline.layout();
            }
        }
    );
    return dom;
};

Exhibit.TimelineView.theme.constructLegendBlockDom = function(
    exhibit,
    title,
    colors,
    labels
) {
    var l10n = Exhibit.TimelineView.l10n;
    var template = {
        tag:        "div",
        className:  "exhibit-timelineView-legendBlock",
        children: [
            {   tag:        "div",
                className:  "exhibit-timelineView-legendBlock-title",
                children:   [ title ]
            }
        ]
    };
    
    var dom = SimileAjax.DOM.createDOMFromTemplate(document, template);
    for (var i = 0; i < colors.length; i++) {
        var div = document.createElement("div");
        div.className = "exhibit-timelineView-legendBlock-entry";
        
        var span = document.createElement("span");
        span.className = "exhibit-timelineView-legendBlock-swatch";
        span.style.background = colors[i];
        span.innerHTML = "&nbsp;";
        
        div.appendChild(span);
        div.appendChild(document.createTextNode(" " + labels[i]));
        dom.elmt.appendChild(div);
    }
    return dom;
}