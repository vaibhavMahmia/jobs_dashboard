import axios from "axios";
import { parseStringPromise } from "xml2js";

const jobFeeds = [
  "https://jobicy.com/?feed=job_feed",
  "https://jobicy.com/?feed=job_feed&job_categories=smm&job_types=full-time",
  //"https://www.higheredjobs.com/rss/articleFeed.cfm"         this URI gives malformed xml which is unable to parese by xml2js therefore skipped this.
];

export const fetchAndParseFeeds = async () => {
  const allJobs = [];

  for (const url of jobFeeds) {
    try {
      const { data: xml } = await axios.get(url);
      //console.log('xml:',xml);
      const json = await parseStringPromise(xml);
      //console.log('json:',json);
      const jobs = json?.rss?.channel?.[0]?.item || [];
      //console.log('jobs:',jobs);

      // Push parsed jobs with source tag (optional)
      allJobs.push(...jobs.map(job => ({ ...job, source: url })));
      //console.log('allJobs:',allJobs);
    } catch (err) {
      console.error(`❌ Error parsing feed: ${url}`, err.message);
    }
  }

  return allJobs;
};