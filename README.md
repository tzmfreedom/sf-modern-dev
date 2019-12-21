# SFDX App

1. create SFDX project from VSCode
2. run command

```
cd /path/to/project
npm install @vue/cli
npx vue create front
cd front
// npx yarn serve
vim vue.config.js
yarn add vue-router bootstrap bootstrap-vue moment
cat << EOF | ../force-app/main/default/pages/vue.page
<apex:page sidebar="false"
  showHeader="false"
  standardStylesheets="false"
  applyBodyTag="false"
  applyHtmlTag="false"
  docType="html-5.0"
  controller="ApiController">
<html lang="ja">
<head>
<meta charset="utf-8"/>
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<link rel="icon" href="/favicon.ico"/>
<title>front</title>
<link href="{!URLFOR($Resource.resource1, '/css/app.css')}" rel="preload" as="style"/>
<link href="{!URLFOR($Resource.resource1, '/css/chunk-vendors.css')}" rel="preload" as="style"/>
<link href="{!URLFOR($Resource.resource1, '/js/app.js')}" rel="preload" as="script"/>
<link href="{!URLFOR($Resource.resource1, '/js/chunk-vendors.js')}" rel="preload" as="script"/>
<link href="{!URLFOR($Resource.resource1, '/css/app.css')}" rel="stylesheet"/>
<link href="{!URLFOR($Resource.resource1, '/css/chunk-vendors.css')}" rel="stylesheet"/>
</head>
<body>
<noscript><strong>We're sorry but front doesn't work properly without JavaScript enabled. Please enable it to continue.</strong></noscript>
<div id="app"></div>
<script src="{!URLFOR($Resource.resource1, '/js/chunk-vendors.js')}"></script>
<script src="{!URLFOR($Resource.resource1, '/js/app.js')}"></script>
</body>
</html>
</apex:page>
EOF
sfdx force:source:deploy --sourcepath ../force-app/main/default/pages/vue.page --json --loglevel fatal
```

## Dev, Build and Test

## Resources

## Description of Files and Directories

## Issues
