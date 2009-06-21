/*==================================================
 *  Exhibit.TabularView English localization
 *==================================================
 */
if (!("l10n" in Exhibit.TabularView)) {
    Exhibit.TabularView.l10n = {};
}

Exhibit.TabularView.l10n.viewLabel = "Table";
Exhibit.TabularView.l10n.viewTooltip = "View items in a table";
    
Exhibit.TabularView.l10n.columnHeaderSortTooltip = "Click to sort by this column";
Exhibit.TabularView.l10n.columnHeaderReSortTooltip = "Click to sort in the reverse order";
Exhibit.TabularView.l10n.makeSortActionTitle = function(label, ascending) {
    return (ascending ? "sorted ascending by " : "sorted descending by ") + label;
};

Exhibit.TabularView.l10n.pageWindowEllipses = " ... ";
Exhibit.TabularView.l10n.pageSeparator = " &bull; ";
Exhibit.TabularView.l10n.previousPage = "&laquo;&nbsp;Previous";
Exhibit.TabularView.l10n.nextPage = "Next&nbsp;&raquo;";
Exhibit.TabularView.l10n.makePagingActionTitle = function(pageIndex) {
    return ("Page " + (pageIndex + 1));
};
Exhibit.TabularView.l10n.makePagingLinkTooltip = function(pageIndex) {
    return ("Go to page " + (pageIndex + 1));
};