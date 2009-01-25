
var mfu_object_list = [];

var MultiFileUpload = Class.create({
  container: "",
  item_template: "",
  separator: "",
  cur_index: -1,
  items: [],
  
  initialize: function(container, item_template, separator) {
    this.container = container;
    this.item_template = item_template;
    this.separator = separator;

    // Internal Bookkeeping
    this.internal_id = mfu_object_list.length;
    mfu_object_list[mfu_object_list.length] = this;
  },
  
  drawInitialState: function() {
    this.log("drawInitialState called");
    
    var html = this.htmlFor(0);
    html += this.addLinkHtml();
    this.log("Setting initial html to: " + html);
    this.cur_index = 0;
    $(this.container).innerHTML = html;
  },
  
  /********* DOM Event Handlers *********/
  addFile: function() {
    this.log("addFile called");
    this.appendHtml(++this.cur_index);
    this.items.push(this.cur_index);
  },
  
  removeFile: function(index) {
    this.log("removeFile called with index = " + index);
    //this.items.delete(function(item) { return item == index; });
    this.getItemContainer(index).remove();
  },
  
  /************ HTML Generation **********/
  appendHtml: function(index) {
    this.log("appendHtml called with index = " + index);
    new Insertion.Before(this.anchorId(), this.htmlFor(index));
    //$(this.anchorId()).insert(this.htmlFor(index), "top");
  },
  
  htmlFor: function(index) {
    this.log("htmlFor called with index = " + index);
    var input = new Template(this.item_template).evaluate({index: index});
    return "<span id='" + this.itemContainerId(index) + "'>" + this.removeLinkHtml(index) + input + this.separator + "</span>";
  },
  
  addLinkHtml: function() {
    return "<a href='javascript:void(0)' id='" + this.anchorId() + "' onclick='mfu_object_list[" + this.internal_id + "].addFile();'>Add Another Attachment</a>";
  },
  
  removeLinkHtml: function(index) {
    return "<a href='javascript:void(0)' onclick='mfu_object_list[" + this.internal_id + "].removeFile(" + index + ");' style='color: red;'>x</a>";
  },
  
  /********** Helpers / Accessors **********/
  getItemContainer: function(index) {
    return $(this.itemContainerId(index));
  },
  
  itemContainerId: function(index) {
    return new Template("mfu_#{id}_container_#{index}").evaluate({id: this.internal_id, index: index});
  },
  
  anchorId: function() {
    return new Template("mfu_#{id}_anchor").evaluate({id: this.internal_id});
  },
  
  /********** Utility **********/
  // Should probably look to mix this in somehow (Prototype must make this easy...)
  log: function(str) {
    if (console === undefined || console.log === undefined) { return false; }
    console.log("[" + this.internal_id + ": MultiFileUpload] " + str);
  }
  
  
});

