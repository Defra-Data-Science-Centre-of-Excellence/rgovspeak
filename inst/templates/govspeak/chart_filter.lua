-- Global variables
--traverse = 'topdown'
chart_id = 0


-- Utility Functions

--- Calculates the total of a given row.
-- @param row The row containing the cells to be summed.
-- @return The total sum of the cells in the row.
function calculate_total(row)
  local total = 0
  for _, cell in ipairs(row) do
    total = total + tonumber(pandoc.utils.stringify(cell))
  end
  return total
end

--- Finds the maximum value in a table.
-- @return The maximum value.
function find_max_value(table)
  local max_value = 0
  for i, row in ipairs(table.rows) do
    for j, cell in ipairs(row) do
      -- Ignore the first column
      if j ~= 1 then
        local value = tonumber(pandoc.utils.stringify(cell))
        if value and value > max_value then
          max_value = value
        end
      end
    end
  end
  return max_value
end

-- Function: calculate_min_max_values
-- Description: Calculates the minimum and maximum values from the active_table rows.
-- Returns: The minimum and maximum values as a tuple.
function calculate_range(rows)
  local min_value, max_value = math.huge, -math.huge
  for _, row in ipairs(rows) do
    local change = tonumber(pandoc.utils.stringify(row[2]))
    min_value, max_value = math.min(min_value, change), math.max(max_value, change)
  end
  return max_value - min_value
end

-- checks a value exists in a table
function exists(table, value)
  for _, v in ipairs(table) do
    if v == value then
      return true
    end
  end
  return false
end

-- HTML Chart Generation Functions
-- Generates an HTML table based on the provided table data.
-- The table is formatted with appropriate classes for styling.
-- The generated HTML is returned as a raw block.
-- @param table The table data to generate the HTML table from.
-- @return The generated HTML table as a string.
function generate_table(table)
  -- Start the HTML string with the opening table tag and classes
  local html = '<table id="table-' .. chart_id .. '" class="js-barchart-table mc-auto-outdent js-barchart-table-init mc-hidden">\n'

  -- Add the table header
  html = html .. '  <thead>\n    <tr>\n'
  for i, cell in pairs(table.headers) do
    -- Add the table header cells with appropriate classes
    html = html .. '      <th scope="col" class="cell-text-' .. (i == 1 and 'left' or 'right') .. '">' .. pandoc.utils.stringify(cell) .. '</th>\n'
  end
  html = html .. '    </tr>\n  </thead>\n'

  -- Add the table body
  html = html .. '  <tbody>\n'
  for _, row in pairs(table.rows) do
    html = html .. '    <tr>\n'
    for i, cell in pairs(row) do
      -- Add the table cells with appropriate classes
      html = html .. '      <td class="cell-text-' .. (i == 1 and 'left' or 'right') .. '">' .. pandoc.utils.stringify(cell) .. '</td>\n'
    end
    html = html .. '    </tr>\n'
  end
  html = html .. '  </tbody>\n'

  -- Close the table tag
  html = html .. '</table>'

  -- Return the HTML as a raw block
  return html
end

-- Generates the class of a chart based on the provided parameters.
-- @param isNegative (boolean) Whether the chart should have a negative class.
-- @param isStacked (boolean) Whether the chart should have a stacked class.
-- @param isCompact (boolean) Whether the chart should have a compact class.
-- @return chart_class (string) The generated chart class.
function generate_chart_class(isNegative, isStacked, isCompact)
  -- 2. set up class of the chart
  chart_class = '  <div aria-hidden="true" class="js-barchart-table mc-auto-outdent mc-chart'

  if isNegative then
    chart_class = chart_class .. ' mc-negative' -- Add mc-negative class if isNegative is true
  end

  if isStacked then
    chart_class = chart_class .. ' mc-stacked' -- Add mc-stacked class if isStacked is true
  end

  if isCompact then
    chart_class = chart_class .. ' compact' -- Add compact class if isCompact is true
  end

  chart_class = chart_class .. '">\n'

  return chart_class
end

-- Generates the legend HTML code for a chart based on the provided table.
-- The legend consists of a header row followed by individual column headers.
-- If a column header is "Total", a special styling is applied.
-- Each column header is enclosed in a <div> element with appropriate classes.
-- The generated legend HTML code is returned as a string.
function generate_chart_legend(table)
  -- 3. set up the legend
  local legend = '    <div class="mc-thead">\n      <div class="mc-tr">\n'

  -- 3.1 The 1st div is the header from the 1st column of the table
  -- Loop over the remaining headers, if our header == Total then stop and create the total div
  for i, header in ipairs(table.header or {}) do
    local headerContent = pandoc.utils.stringify(header)
    if i == 1 then
      -- Add the header div for the first column
      legend = legend .. '        <div class="mc-th">' .. headerContent .. '</div>\n'
    elseif i < #table.header or 0 then
      if headerContent == 'Total' then
        -- Add the total div with special styling
        legend = legend .. '        <div class="mc-th mc-stacked-header mc-header-total">Total</div>\n'
      else
        -- Add the div for other headers with appropriate classes
        local keyClass = "mc-key-header mc-key-" .. (i - 1)
        legend = legend .. '        <div class="mc-th ' .. keyClass .. '">' .. headerContent .. '</div>\n'
      end
    end
  end

  -- Close the legend divs
  legend = legend .. '      </div>\n    </div>\n'

  return legend
end

-- Helper function to generate a div for a cell
-- Function: generate_cell_div
-- Description: Generates a cell div element for a chart filter.
-- Parameters:
--   - value: The value to be displayed in the cell.
--   - barClass: The class name for the bar element.
--   - width: The width of the bar element.
--   - isStacked: A boolean indicating whether the chart is stacked.
--   - isNegative: A boolean indicating whether the value is negative.
-- Returns:
--   - The generated cell div element as a string.
function generate_cell_div(value, barClass, width, isStacked, isNegative)
  local margin_left, dent = 0, "mc-bar-indented"
  local span_style = ""

  if isNegative then
    margin_left = value >= 0 and 65 or (65 - width)
    if margin_left >= 0 and width < 7 then
      dent = "mc-bar-outdented"
      span_style = ' style="margin-left: 100%; display: inline-block;"'
    elseif margin_left < 0 then
      margin_left = 0
      width = 65
    end
  end

  local style = 'style="width: ' .. width .. '%;' -- Set the width style for the bar cell
  if isNegative then
    style = 'style="margin-left: ' .. margin_left .. '%; width: ' .. width .. '%;' -- Adjust the style for negative values
  end

  local indent = isStacked and '' or ' mc-bar-indented' -- Add indentation class if the chart is stacked
  return '      <div class="mc-td mc-bar-cell ' .. barClass .. ' ' .. dent .. indent .. '" ' .. style .. '">\n' ..
      '        <span' .. span_style .. '>' .. value .. '</span>\n      </div>\n' -- Generate the cell div element
end


-- Helper function to generate a div for a total cell
-- Generates a div element with a given value as its content.
-- 
-- Parameters:
--   value (string): The value to be displayed inside the div element.
-- 
-- Returns:
--   string: The generated div element as a string.
function generate_total_div(value)
  return '      <div class="mc-td mc-stacked-total">' .. value .. '</div>\n'
end

-- Generates the body of a chart based on the provided table data, with optional features for 
-- negative values and stacked bars.
-- @param table The table data for the chart.
-- @param isNegative Flag indicating whether the chart should handle negative values.
-- @param isStacked Flag indicating whether the chart should have stacked bars.
-- @return The generated chart body as a string.
function generate_chart_body(table, isNegative, isStacked)
  -- Calculate the range of values in the table
  local range = calculate_range(table.rows)
  
  -- Initialize the chart body
  local body = '  <div class="mc-tbody">\n'

  -- Iterate over each row in the table
  for i, row in ipairs(table.rows) do
    -- Add the row container
    body = body .. '    <div class="mc-tr">\n      <div class="mc-td mc-key-cell">' ..
        pandoc.utils.stringify(row[1]) .. '</div>\n'

    -- Iterate over each value in the row
    for j = 2, #row do
      local value = tonumber(pandoc.utils.stringify(row[j]))
      local width, barClass, margin_left

      -- Determine the width and class of the bar based on the value and options
      barClass = 'mc-bar-' .. (j - 1)

      if isNegative then
        width = math.abs(value) / range * 100
        local bar_direction = value < 0 and " mc-bar-negative" or " mc-bar-positive"
        barClass = barClass .. bar_direction
      else
        width = value / find_max_value(table) * 65
        -- width = math.log(value + 1) / math.log(find_max_value(table) + 1) * 60
      end

      -- Generate the appropriate div based on the options
      if j == #row and isStacked then
        body = body .. generate_total_div(value)
      else
        body = body .. generate_cell_div(value, barClass, width, isStacked, isNegative)
      end
    end

    -- Close the row container
    body = body .. '    </div>\n'
  end

  -- Return the generated chart body
  return body
end

-- Function: generate_chart_html
-- Description: Generates HTML code for a chart based on the provided table and options.
-- Parameters:
--   - table: The table containing the chart data.
--   - options: The options for customizing the chart.
-- Returns:
--   - html: The generated HTML code for the chart.
function generate_chart_html(table, options)
  -- 1. Check our options
  local isNegative = exists(options, 'negative')
  local isStacked = exists(options, 'stacked')
  local isCompact = exists(options, 'compact')

  -- 2. Create chart container
  html = '<div id="chart-' .. chart_id .. '" class="mc-chart-container" aria-labelledby="mc-chart-not-accessible-' ..
      chart_id .. '">\n'

  -- 3. Create the chart class
  local chart_class = generate_chart_class(isNegative, isStacked, isCompact)

  -- 4 Create the chart legend
  local legend = generate_chart_legend(table)

  -- 5 Create the chart body
  local body = generate_chart_body(table, isNegative, isStacked)

  html = html .. chart_class .. legend .. body

  -- 6 Close the remaining divs
  html = html .. '  </div></div></div>\n'

  chart_id = chart_id + 1
  return html
end

-- Function to process a table block
--- Processes a table block and returns a simplified version of the table.
-- If an active table is provided, it is added to the output before processing the new table block.
-- @param block The table block to be processed.
-- @param active_table The active table to be added to the output.
-- @param output The output table to store the processed tables.
-- @return The simplified version of the table block.
function process_table_block(block, active_table, output)
  -- Check if there is an active table and add it to the output
  if active_table ~= nil then
    table.insert(output, pandoc.utils.from_simple_table(active_table))
  end
  -- Convert the table block to a simplified version
  return pandoc.utils.to_simple_table(block)
end

--- Extracts barchart options from a given content string.
-- @param content_str The content string to extract options from.
-- @return A table containing the extracted options.
function extract_barchart_options(content_str)
  local options = {}
  -- Iterate over each option in the content string
  for option in string.gmatch(content_str, "{barchart%s+([^}]+)}") do
    -- Iterate over each word in the option
    for word in string.gmatch(option, "%w+") do
      -- Add the word to the options table
      table.insert(options, word)
    end
  end
  return options
end

-- Function: generate_chart_and_button_html
-- Description: Generates HTML code for a chart, a button, and a table.
-- Parameters:
--   - active_table: The table data to be displayed.
--   - options: Additional options for generating the chart and table.
-- Returns:
--   - The generated HTML code as a pandoc RawBlock.
function generate_chart_and_button_html(active_table, options)
  -- Generate the HTML code for the toggle button
  local button_html = [[<button class="govuk-body-s mc-toggle-button" onclick="toggleChartAndTable(]] .. chart_id .. [[)">
  <span class="mc-toggle-text">Change to table and accessible view</span>
  <span class="govuk-visually-hidden mc-toggle-status" role="alert"></span>
  </button>]]

  -- Generate the HTML code for the table
  local table_html = generate_table(active_table)

  -- Generate the HTML code for the chart
  local chart_html = generate_chart_html(active_table, options)

  -- Combine the button, table, and chart HTML code into a single RawBlock
  return pandoc.RawBlock('html', button_html .. table_html .. chart_html)
end

-- Function: process_para_block
-- Description: Processes a paragraph block, checking for a barchart tag and generating HTML output accordingly.
-- Parameters:
--   - block: The paragraph block to process.
--   - active_table: The active table to use for generating the chart.
--   - output: The output table to store the generated HTML.
-- Returns:
--   - active_table: The updated active table.
function process_para_block(block, active_table, output)
  local content_str = pandoc.utils.stringify(block)
  if string.match(content_str, "{barchart%s*([^}]*)}") then

    -- Check if there is an active table
    if active_table ~= nil then
      local options = extract_barchart_options(content_str)
      table.insert(output, generate_chart_and_button_html(active_table, options)) -- Insert generated chart and button HTML into output
      active_table = nil
    else
      table.insert(output, block) -- Render the paragraph even if it's not after a table
      return active_table
    end
  else
    -- Check if there is an active table
    if active_table ~= nil then
      table.insert(output, pandoc.utils.from_simple_table(active_table)) -- Insert processed table into output
      active_table = nil
    end
    table.insert(output, block) -- Insert other block types into output
  end
  return active_table
end
-- Function: Pandoc
-- Description: This function processes a Pandoc document by iterating over its blocks and performing specific actions based on the block type.
-- Parameters:
--   - doc (table): The Pandoc document to be processed.
-- Returns:
--   - doc (table): The processed Pandoc document.
function Pandoc(doc)
  local output = {} -- Output table to store processed blocks
  local active_table = nil -- Active table to be processed

  for i, block in ipairs(doc.blocks) do
    if block.t == "Table" then
      active_table = process_table_block(block, active_table, output) -- Process table block
    elseif block.t == "Para" then
      active_table = process_para_block(block, active_table, output) -- Process paragraph block
    else
      if active_table ~= nil then
        table.insert(output, pandoc.utils.from_simple_table(active_table)) -- Insert processed table into output
        active_table = nil
      end
      table.insert(output, block) -- Insert other block types into output
    end
  end

  if active_table ~= nil then
    table.insert(output, pandoc.utils.from_simple_table(active_table)) -- Insert remaining active table into output
  end

  doc.blocks = output -- Update document blocks with processed output
  return doc
end