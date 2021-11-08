# serenity-zephyr-result-publisher

## Configuration publisher
```
JSON_INPUT_PATH= #path_to_serenity_report_results
ZEPHYR_DOMAIN= #zephyr_scale_dommain
ZEPHYR_TOKEN= #zephyr_scale_api_token
ZEPHYR_PROJECT_KEY= #zephyr_scale_project_key
ZEPHYR_FOLDER_PARENT_ID= #parent_folder_id_where_new_test_cases_will_be_stored
ZEPHYR_TEST_CYCLE_FOLDER= #parent_folder_id_where_new_test_cycles_will_be_stored
SERENITY_REPORT_DOMAIN= #domain_where_serenity_report_results_will_be_published
RUN_ID= #run_id_on_CI
BRANCH_NAME= #branch_name
```
## Execution
```
npm run publisher
```

