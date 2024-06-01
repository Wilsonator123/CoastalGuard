import json

# Load JSON data from a file
with open('station_list.json', 'r') as file:
    data = json.load(file)

# Filter out the objects where the country is Scotland
filtered_data = [item for item in data if item['properties']['Country'] != "Scotland"]
for item in filtered_data:
    item['long'] = item['lon']
    del item['lon']
# Write the filtered data back to the file
with open('station_list.json', 'w') as file:
    json.dump(filtered_data, file, indent=2)
