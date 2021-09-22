// import data.
var regions = table2


var dataset = ee.Image('CGIAR/SRTM90_V4');
var elevation = dataset.select('elevation');
var slope = ee.Terrain.slope(elevation);
print(slope,'slope:')

// calculate the elevation for each feature.
var ts = ee.Image(elevation).reduceRegions({collection: regions, reducer: ee.Reducer.mean(), scale: 30});

// print results.
print(ts);

// Export a KML file to Storage.
Export.table.toCloudStorage({
  collection: ts,
  description:'India villages mean elevation data',
  bucket: 'Elevation_data',
  fileNamePrefix: 'India_village',
  fileFormat: 'SHP'
});





