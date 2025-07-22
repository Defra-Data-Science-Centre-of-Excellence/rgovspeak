-- Custom TOC generator for GOV.UK style (include all h2 and h3 headings)
function Pandoc(doc)
  local headings = {}
  local index_total = 0
  -- Collect all level 2 and 3 headings for the TOC
  for _, el in ipairs(doc.blocks) do
    if el.t == "Header" and (el.level == 2) then
      index_total = index_total + 1
      table.insert(headings, el)
    end
  end

  local toc_items = {}
  for i, h in ipairs(headings) do
    local id = h.identifier
    local text = pandoc.utils.stringify(h)
    local numbered = string.match(text, "^%d+[%.,%)]?%s?")
    local item
    if numbered then
      -- Remove the leading number and following space/punctuation from the heading text for the TOC
      local clean_text = string.gsub(text, "^%d+[%.,%)]?%s?", "")
      item = string.format([[<li class="gem-c-contents-list__list-item gem-c-contents-list__list-item--numbered">
  <span class="gem-c-contents-list__list-item-dash" aria-hidden="true"></span>
  <a class="gem-c-contents-list__link govuk-link gem-c-force-print-link-styles govuk-link--no-underline"
     data-ga4-link="{&quot;event_name&quot;:&quot;select_content&quot;,&quot;section&quot;:&quot;Contents&quot;,&quot;type&quot;:&quot;contents list&quot;,&quot;index_total&quot;:%d,&quot;index_link&quot;:%d}"
     href="#%s"><span class="gem-c-contents-list__number">%d. </span><span class="gem-c-contents-list__numbered-text">%s</span></a>
</li>]], index_total, i, id, i, clean_text)
    else
      item = string.format([[<li class="gem-c-contents-list__list-item gem-c-contents-list__list-item--numbered">
  <span class="gem-c-contents-list__list-item-dash" aria-hidden="true"></span>
  <a class="gem-c-contents-list__link govuk-link gem-c-force-print-link-styles govuk-link--no-underline"
     data-ga4-link="{&quot;event_name&quot;:&quot;select_content&quot;,&quot;section&quot;:&quot;Contents&quot;,&quot;type&quot;:&quot;contents list&quot;,&quot;index_total&quot;:%d,&quot;index_link&quot;:%d}"
     href="#%s">%s</a>
</li>]], index_total, i, id, text)
    end
    table.insert(toc_items, item)
  end

  local toc_html = table.concat(toc_items, "\n")
  doc.meta.custom_toc = pandoc.MetaBlocks{pandoc.RawBlock("html", toc_html)}
  return doc
end

-- Build department div HTML for a given department key
local function build_department_div(department)
  local departments = {
    ["10_downing_street"] = {
      brand = "prime-ministers-office-10-downing-street",
      display_text = "Prime Minister's Office <br>10 Downing Street",
      url = "https://www.gov.uk/government/organisations/prime-ministers-office-10-downing-street",
      a_class = "gem-c-organisation-logo__container gem-c-organisation-logo__link gem-c-organisation-logo__crest gem-c-organisation-logo__crest--eo brand__border-color"
    },
    ["attorney_generals_office"] = {
      brand = "attorney-generals-office",
      display_text = "Attorney <br>General's <br>Office",
      url = "https://www.gov.uk/government/organisations/attorney-generals-office",
      a_class = "gem-c-organisation-logo__container gem-c-organisation-logo__link gem-c-organisation-logo__crest gem-c-organisation-logo__crest--single-identity brand__border-color"
    },
    ["cabinet_office"] = {
      brand = "cabinet-office",
      display_text = "Cabinet Office",
      url = "https://www.gov.uk/government/organisations/cabinet-office",
      a_class = "gem-c-organisation-logo__container gem-c-organisation-logo__link gem-c-organisation-logo__crest gem-c-organisation-logo__crest--single-identity brand__border-color"
    },
    ["department_for_business_trade"] = {
      brand = "department-for-business-trade",
      display_text = "Department for<br> Business &amp; Trade",
      url = "https://www.gov.uk/government/organisations/department-for-business-and-trade",
      a_class = "gem-c-organisation-logo__container gem-c-organisation-logo__link gem-c-organisation-logo__crest gem-c-organisation-logo__crest--dbt brand__border-color"
    },
    ["department_for_culture_media_sport"] = {
      brand = "department-for-culture-media-sport",
      display_text = "Department <br>for Culture,<br>Media &amp; Sport",
      url = "https://www.gov.uk/government/organisations/department-for-culture-media-and-sport",
      a_class = "gem-c-organisation-logo__container gem-c-organisation-logo__link gem-c-organisation-logo__crest gem-c-organisation-logo__crest--single-identity brand__border-color"
    },
    ["department_for_education"] = {
      brand = "department-for-education",
      display_text = "Department <br>for Education",
      url = "https://www.gov.uk/government/organisations/department-for-education",
      a_class = "gem-c-organisation-logo__container gem-c-organisation-logo__link gem-c-organisation-logo__crest gem-c-organisation-logo__crest--single-identity brand__border-color"
    },
    ["department_for_energy_security_net_zero"] = {
      brand = "department-for-business-innovation-skills",
      display_text = "Department for<br>Energy Security<br>&amp; Net Zero",
      url = "https://www.gov.uk/government/organisations/department-for-energy-security-and-net-zero",
      a_class = "gem-c-organisation-logo__container gem-c-organisation-logo__link gem-c-organisation-logo__crest gem-c-organisation-logo__crest--single-identity brand__border-color"
    },
    ["department_for_environment_food_rural_affairs"] = {
      brand = "department-for-environment-food-rural-affairs",
      display_text = "Department<br>for Environment,<br>Food &amp; Rural Affairs",
      url = "https://www.gov.uk/government/organisations/department-for-environment-food-rural-affairs",
      a_class = "gem-c-organisation-logo__container gem-c-organisation-logo__link gem-c-organisation-logo__crest gem-c-organisation-logo__crest--single-identity brand__border-color"
    },
    ["department_for_science_innovation_technology"] = {
      brand = "department-for-science-innovation-technology",
      display_text = "Department for<br>Science, Innovation<br>&amp; Technology",
      url = "https://www.gov.uk/government/organisations/department-for-science-innovation-and-technology",
      a_class = "gem-c-organisation-logo__container gem-c-organisation-logo__link gem-c-organisation-logo__crest gem-c-organisation-logo__crest--single-identity brand__border-color"
    },
    ["department_for_transport"] = {
      brand = "department-for-transport",
      display_text = "Department<br>for Transport",
      url = "https://www.gov.uk/government/organisations/department-for-transport",
      a_class = "gem-c-organisation-logo__container gem-c-organisation-logo__link gem-c-organisation-logo__crest gem-c-organisation-logo__crest--single-identity brand__border-color"
    },
    ["department_for_work_pensions"] = {
      brand = "department-for-work-pensions",
      display_text = "Department<br>for Work &amp; <br>Pensions",
      url = "https://www.gov.uk/government/organisations/department-for-work-pensions",
      a_class = "gem-c-organisation-logo__container gem-c-organisation-logo__link gem-c-organisation-logo__crest gem-c-organisation-logo__crest--single-identity brand__border-color"
    },
    ["department_of_health_social_care"] = {
      brand = "department-of-health",
      display_text = "Department<br>of Health &amp;<br>Social Care",
      url = "https://www.gov.uk/government/organisations/department-of-health-and-social-care",
      a_class = "gem-c-organisation-logo__container gem-c-organisation-logo__link gem-c-organisation-logo__crest gem-c-organisation-logo__crest--single-identity brand__border-color"
    },
    ["foreign_commonwealth_development_office"] = {
      brand = "foreign-commonwealth-development-office",
      display_text = "Foreign, Commonwealth<br>&amp; Development Office",
      url = "https://www.gov.uk/government/organisations/foreign-commonwealth-development-office",
      a_class = "gem-c-organisation-logo__container gem-c-organisation-logo__link gem-c-organisation-logo__crest gem-c-organisation-logo__crest--single-identity brand__border-color"
    },
    ["hm_treasury"] = {
      brand = "hm-treasury",
      display_text = "HM Treasury",
      url = "https://www.gov.uk/government/organisations/hm-treasury",
      a_class = "gem-c-organisation-logo__container gem-c-organisation-logo__link gem-c-organisation-logo__crest gem-c-organisation-logo__crest--single-identity brand__border-color"
    },
    ["home_office"] = {
      brand = "home-office",
      display_text = "Home Office",
      url = "https://www.gov.uk/government/organisations/home-office",
      a_class = "gem-c-organisation-logo__container gem-c-organisation-logo__link gem-c-organisation-logo__crest gem-c-organisation-logo__crest--ho brand__border-color"
    },
    ["ministry_of_defence"] = {
      brand = "ministry-of-defence",
      display_text = "Ministry<br>of Defence",
      url = "https://www.gov.uk/government/organisations/ministry-of-defence",
      a_class = "gem-c-organisation-logo__container gem-c-organisation-logo__link gem-c-organisation-logo__crest gem-c-organisation-logo__crest--mod brand__border-color"
    },
    ["ministry_of_housing_communities_local_government"] = {
      brand = "ministry-of-housing-communities-local-government",
      display_text = "Ministry of Housing,<br>Communities &amp; <br>Local Government",
      url = "https://www.gov.uk/government/organisations/ministry-of-housing-communities-local-government",
      a_class = "gem-c-organisation-logo__container gem-c-organisation-logo__link gem-c-organisation-logo__crest gem-c-organisation-logo__crest--single-identity brand__border-color"
    },
    ["ministry_of_justice"] = {
      brand = "ministry-of-justice",
      display_text = "Ministry<br>of Justice",
      url = "https://www.gov.uk/government/organisations/ministry-of-justice",
      a_class = "gem-c-organisation-logo__container gem-c-organisation-logo__link gem-c-organisation-logo__crest gem-c-organisation-logo__crest--single-identity brand__border-color"
    },
    ["northern_ireland_office"] = {
      brand = "northern-ireland-office",
      display_text = "Northern<br>Ireland<br>Office",
      url = "https://www.gov.uk/government/organisations/northern-ireland-office",
      a_class = "gem-c-organisation-logo__container gem-c-organisation-logo__link gem-c-organisation-logo__crest gem-c-organisation-logo__crest--single-identity brand__border-color"
    },
    ["office_of_the_advocate_general_for_scotland"] = {
      brand = "office-of-the-advocate-general-for-scotland",
      display_text = "Office of the<br>Advocate General<br>for Scotland",
      url = "https://www.gov.uk/government/organisations/office-of-the-advocate-general-for-scotland",
      a_class = "gem-c-organisation-logo__container gem-c-organisation-logo__link gem-c-organisation-logo__crest gem-c-organisation-logo__crest--single-identity brand__border-color"
    },
    ["office_of_the_leader_of_the_house_of_commons"] = {
      brand = "office-of-the-leader-of-the-house-of-commons",
      display_text = "Office of the <br>Leader of the <br>House of Commons",
      url = "https://www.gov.uk/government/organisations/the-office-of-the-leader-of-the-house-of-commons",
      a_class = "gem-c-organisation-logo__container gem-c-organisation-logo__link gem-c-organisation-logo__crest gem-c-organisation-logo__crest--portcullis brand__border-color"
    },
    ["office_of_the_leader_of_the_house_of_lords"] = {
      brand = "office-of-the-leader-of-the-house-of-lords",
      display_text = "Office of the<br>Leader of the<br>House of Lords",
      url = "https://www.gov.uk/government/organisations/office-of-the-leader-of-the-house-of-lords",
      a_class = "gem-c-organisation-logo__container gem-c-organisation-logo__link gem-c-organisation-logo__crest gem-c-organisation-logo__crest--portcullis brand__border-color"
    },
    ["scotland_office"] = {
      brand = "scotland-office",
      display_text = "Scotland Office",
      url = "https://www.gov.uk/government/organisations/scotland-office",
      a_class = "gem-c-organisation-logo__container gem-c-organisation-logo__link gem-c-organisation-logo__crest gem-c-organisation-logo__crest--so brand__border-color"
    },
    ["uk_export_finance"] = {
      brand = "department-for-business-trade",
      display_text = "UK Export <br>Finance",
      url = "https://www.gov.uk/government/organisations/uk-export-finance",
      a_class = "gem-c-organisation-logo__container gem-c-organisation-logo__link gem-c-organisation-logo__crest gem-c-organisation-logo__crest--dbt brand__border-color"
    },
    ["wales_office"] = {
      brand = "wales-office",
      display_text = "Wales Office",
      url = "https://www.gov.uk/government/organisations/wales-office",
      a_class = "gem-c-organisation-logo__container gem-c-organisation-logo__link gem-c-organisation-logo__crest gem-c-organisation-logo__crest--wales brand__border-color"
    }
  }

  local dept = departments[department]
  if not dept then return "" end
  return string.format([[<div class="gem-c-organisation-logo brand--%s">
    <a class="%s"
      href="%s">
      <span class="gem-c-organisation-logo__name">%s</span>
    </a>
  </div>]], dept.brand, dept.a_class, dept.url, dept.display_text)
end

function Meta(meta)
  local dept_key
  if meta.department then
    dept_key = pandoc.utils.stringify(meta.department)
  else
    dept_key = "department_for_environment_food_rural_affairs"
  end
  meta["department_div"] = pandoc.MetaBlocks{pandoc.RawBlock("html", build_department_div(dept_key))}

  -- Set default caption if missing or empty
  if not meta.caption or pandoc.utils.stringify(meta.caption) == "" then
    meta.caption = "Accredited official statistics"
  end

  return meta
end

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
