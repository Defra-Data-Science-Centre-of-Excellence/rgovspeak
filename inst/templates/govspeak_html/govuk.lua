-- insert a warning callout
local function warning(el)
  local html
  local res = {}

  html = '<div role="note" aria-label="Warning" class="application-notice help-notice">' ..
         '<p>'

  table.insert(res, pandoc.RawBlock('html', html))

  -- remove the end tag
  el.content[#el.content].text = el.content[#el.content].text:sub(1, -2)

  for i,block in ipairs(el.content) do
    if i == 1 then
      -- first Str so remove the tag
      block.text = block.text:sub(2)
    end

    table.insert(res, pandoc.Plain(block))
  end

  table.insert(res, pandoc.RawBlock('html', '</p>'))
  table.insert(res, pandoc.RawBlock('html', '</div>'))
  return res
end

-- insert an information callout
local function information(el)
  local html
  local res = {}

  html = '<div role="note" aria-label="Information" class="application-notice info-notice">' ..
         '<p>'

  table.insert(res, pandoc.RawBlock('html', html))

  -- remove the end tag
  el.content[#el.content].text = el.content[#el.content].text:sub(1, -2)

  for i,block in ipairs(el.content) do
    if i == 1 then
      -- first Str so remove the tag
      block.text = block.text:sub(2)
    end

    table.insert(res, pandoc.Plain(block))
  end

  table.insert(res, pandoc.RawBlock('html', '</p>'))
  table.insert(res, pandoc.RawBlock('html', '</div>'))
  return res
end

-- insert an example callout
local function example(el)
  local html
  local res = {}

  html = '<div class="example">' ..
         '<p>'

  table.insert(res, pandoc.RawBlock('html', html))

  -- remove the end tag
  el.content[#el.content].text = el.content[#el.content].text:sub(1, -3)

  for i,block in ipairs(el.content) do
    if i == 1 then
      -- first Str so remove the tag
      block.text = block.text:sub(3)
    end

    table.insert(res, pandoc.Plain(block))
  end

  table.insert(res, pandoc.RawBlock('html', '</p>'))
  table.insert(res, pandoc.RawBlock('html', '</div>'))
  return res
end

-- insert an call to action callout
local function cta(el)
  local html
  local res = {}

  html = '<div class="call-to-action">' ..
         '<p>'

  table.insert(res, pandoc.RawBlock('html', html))

  -- remove the end tag
  el.content[#el.content].text = el.content[#el.content].text:sub(1, -5)

  for i,block in ipairs(el.content) do
    if i == 1 then
      -- first Str so remove the tag
      block.text = block.text:sub(5)
    end

    table.insert(res, pandoc.Plain(block))
  end

  table.insert(res, pandoc.RawBlock('html', '</p>'))
  table.insert(res, pandoc.RawBlock('html', '</div>'))
  return res
end

-- insert an address box
local function address(el)
  local html
  local res = {}

  html = '<div class="address">' ..
         '<div class="adr org fn">' ..
         '<p>'

  table.insert(res, pandoc.RawBlock('html', html))

  -- remove the end tag
  el.content[#el.content].text = el.content[#el.content].text:sub(1, -3)

  for i,block in ipairs(el.content) do
    if i == 1 then
      -- first Str so remove the tag
      block.text = block.text:sub(3)
    end

    -- convert all the SoftBreak inlines to <br>
    -- start at the 3rd inline as its the beginning of the text after the start tag
    if i > 2 and block.tag == 'SoftBreak' then
      table.insert(res, pandoc.RawBlock('html', '<br>'))
    end

    table.insert(res, pandoc.Plain(block))
  end

  table.insert(res, pandoc.RawBlock('html', '</p>'))
  table.insert(res, pandoc.RawBlock('html', '</div>'))
  table.insert(res, pandoc.RawBlock('html', '</div>'))
  return res
end

-- insert a contact box
local function contact(el)
  local html
  local res = {}

  html = '<div class="contact">' ..
         '<p>'

  table.insert(res, pandoc.RawBlock('html', html))

  -- remove the end tag
  el.content[#el.content].text = el.content[#el.content].text:sub(1, -3)

  for i,block in ipairs(el.content) do
    if i == 1 then
      -- first Str so remove the tag
      block.text = block.text:sub(3)
    end

    -- convert all the SoftBreak inlines to <br>
    -- start at the 3rd inline as its the beginning of the text after the start tag
    if i > 2 and block.tag == 'SoftBreak' then
      table.insert(res, pandoc.RawBlock('html', '<br>'))
    end

    table.insert(res, pandoc.Plain(block))
  end

  table.insert(res, pandoc.RawBlock('html', '</p>'))
  table.insert(res, pandoc.RawBlock('html', '</div>'))
  return res
end

-- insert a step (ordered list)
local function step(el)
  local res = {}

  -- start the list
  table.insert(res, pandoc.RawBlock('html', '<ol class="steps">'))

  for i,block in ipairs(el.content) do
    -- if our Str inline contains a step tag create a new list entry
    if i == 1 and block.tag == "Str" and string.match(block.text, "^s[1-30]%.") ~= nil then
      table.insert(res, pandoc.RawBlock('html', '<li>')) -- open the 1st step
      table.insert(res, pandoc.RawBlock('html', '<p>')) -- open the paragraph
    elseif block.tag == "Str" and string.match(block.text, "^s[1-30]%.") ~= nil then
      table.insert(res, pandoc.RawBlock('html', '</p>'))
      table.insert(res, pandoc.RawBlock('html', '</li>')) -- close the previous step
      table.insert(res, pandoc.RawBlock('html', '<li>')) -- open the next step
      table.insert(res, pandoc.RawBlock('html', '<p>')) -- open the paragraph
    else
      table.insert(res, pandoc.Plain(block)) -- insert the text
    end
  end

  table.insert(res, pandoc.RawBlock('html', '</p>'))
  table.insert(res, pandoc.RawBlock('html', '</li>'))
  table.insert(res, pandoc.RawBlock('html', '</ol>'))
  return res
end

-- insert a download link
local function download(el)
  local html
  local res = {}

  html = '<div class="form-download">' ..
         '<p>'

  table.insert(res, pandoc.RawBlock('html', html))

  -- remove the end tag
  el.content[#el.content].text = el.content[#el.content].text:sub(1, -3)

  for i,block in ipairs(el.content) do
    if i == 1 then
      -- first Str so remove the tag
      block.text = block.text:sub(3)
    end

    table.insert(res, pandoc.Plain(block))
  end

  table.insert(res, pandoc.RawBlock('html', '</p>'))
  table.insert(res, pandoc.RawBlock('html', '</div>'))
  return res
end

local function dump(o)
   if type(o) == 'table' then
      local s = '{ '
      for k,v in pairs(o) do
         if type(k) ~= 'number' then k = '"'..k..'"' end
         s = s .. '['..k..'] = ' .. dump(v) .. ','
      end
      return s .. '} '
   else
      return tostring(o)
   end
end

-- insert a button
local function button(el)
  local html

  html = '<p><a class="gem-c-button govuk-button" role="button" draggable="false" href=' ..
        el.target ..
        '>' ..
        pandoc.utils.stringify(el) ..
        '</a></p>'

  return pandoc.RawBlock('html', html)
end

-- insert a start button
local function button_start(el)
  local html

  html = '<p><a class="gem-c-button govuk-button govuk-button--start" role="button" draggable="false" href=' .. el.target .. '>' ..
         pandoc.utils.stringify(el) .. '<svg class="govuk-button__start-icon govuk-!-display-none-print"' ..
         'xmlns="http://www.w3.org/2000/svg"' .. 'width="17.5" height="19" viewBox="0 0 33 40" role="presentation" focusable="false">' ..
         '<path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z"></path></svg></a></p>'

  return pandoc.RawBlock('html', html)
end

function Para(el)
  -- convert the content to a string
  content_str = pandoc.utils.stringify(el)

  -- check for govespeak tags
  if string.match(content_str, "^%%.*%%$") ~= nil then           -- matches %some text%
    return warning(el)
  elseif string.match(content_str, "^%^.*%^$") ~= nil then       -- matches ^some text^
    return information(el)
  elseif string.match(content_str, "^%$E.*%$E$") ~= nil then     -- matches $E some text $E
    return example(el)
  elseif string.match(content_str, "^%$CTA.*%$CTA$") ~= nil then -- matches $CTA some text $CTA
    return cta(el)
  elseif string.match(content_str, "^%$A.*%$A$") ~= nil then     -- matches $A some text $A
    return address(el)
  elseif string.match(content_str, "^%$C.*%$C$") ~= nil then     -- matches $C some text $C
    return contact(el)
  elseif string.match(content_str, "^s[1-30]%.") ~= nil then     -- matches s1., s2., s3. etc up to s30.
    return step(el)
  elseif string.match(content_str, "^%$D.*%$D$") ~= nil then     -- matches $D some text $D
    return download(el)
  elseif string.match(content_str, "^%{button%}.*%{/button%}$") ~= nil then       -- matches {button} some text {/button}
    -- pandoc thinks its a link so we can just pass that in
    return button(el.content[2])
  elseif string.match(content_str, "^%{button start%}.*%{/button%}$") ~= nil then -- matches {button start} some text {/button}
    -- element 4 is the link this time
    return button_start(el.content[4])
  elseif string.match(content_str, "^%{button start cross.*%}.*%{/button%}$") ~= nil then
    -- matches {button start cross-domain-tracking:UA-XXXXXX-Y} some text {/button}
    -- element 7 is the link this time
    return button_start(el.content[7])
  else
    return el -- its not a govspeak tag so just return
  end

end

