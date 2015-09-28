/**
 * gritty.js
 * Author: David Yeung
 *
 * DESCRIPTION
 * Overlays a grid on a page.
 *
 * USAGE
 * Draw a grid of made of squares 32 pixels wide:
 * gritty.draw(32);
 *
 * Same as above, but with a margin of 10 pixels:
 * gritty.draw(32, 10);
 *
 * If you want rectangles instead of squares, do something like this:
 * gritty.draw_columns(64);
 * gritty.draw_rows(32);  // Columns will be twice as large as rows.
 *
 * Start drawing from a certain position.
 * gritty.draw_columns(32, 0, 100, 100);  // Will start drawing columns starting from coordinate (100, 100).
 *
 * Stop drawing at a certain position.
 * gritty.draw_columns(32, 0, 0, 0, 400, 400);  // Will stop drawing columns at coordinate (400, 400).
 *
 * DEPENDENCIES
 * jQuery
 *
 * NOTES
 * Make sure to include this script and the accompanying CSS
 * file. Also, feel free to change up the style to whatever suits you.
 *
 */

var gritty = {};

gritty.draw_columns = function(spacing, gutter_spacing, start_x, start_y, end_x, end_y) {
  if (!gutter_spacing) gutter_spacing = 0;
  if (!start_x) start_x = 0;
  if (!start_y) start_y = 0;
  if (!end_x) end_x = $(document).width();
  if (!end_y) end_y = $(document).height();

  var css = {
    left:start_x,
    top:start_y,
    height:end_y - start_y
  };

  var x = start_x;
  var draw_col = true;
  while (x < end_x) {
    css.left = x;
    if (!draw_col || gutter_spacing != 0) {
      $('<div class="line col" />').css(css).appendTo('body');
    }
    if (draw_col) x += spacing;
    else x += gutter_spacing;
    draw_col = !draw_col;
  }
};

gritty.draw_rows = function(spacing, gutter_spacing, start_x, start_y, end_x, end_y) {
  if (!gutter_spacing) gutter_spacing = 0;
  if (!start_x) start_x = 0;
  if (!start_y) start_y = 0;
  if (!end_x) end_x = $(document).width();
  if (!end_y) end_y = $(document).height();

  var css = {
    left:start_x,
    top:start_y,
    width:end_x - start_x
  };

  var y = start_y;
  var draw_row = true;
  while (y < end_y) {
    css.top = y;
    // If gutter spacing is 0, we'd end up writing the same line
    // twice, causing it to appear darker. This if statement avoids
    // this situation.
    if (!draw_row || gutter_spacing != 0) {
      $('<div class="line row" />').css(css).appendTo('body');
    }
    if (draw_row) y += spacing;
    else y += gutter_spacing;
    draw_row = !draw_row;
  }
};

gritty.draw = function(spacing, margin) {
  var $body = $('body');

  var doc_width = $(document).width();
  var doc_height = $(document).height();

  gritty.draw_columns(spacing, margin);
  gritty.draw_rows(spacing, margin);
};
