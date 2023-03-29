# Running project

In two seperate terminals:

```
cd backend
npm i
npm run start
```
```
cd frontend
npm i
cd brand-compare
ng serve
```

In you browser, navigate to http://localhost:4200/


# Encountered issues

Using get_profile_data for a twitter account has unexpected behaviour:

1. The fields: followers, following and following_change disappear on the entry corresponding to end date. 
2. Besides the entries for the days in the given range, more entries for days that are not in the range appear in the following format '[other_date]': { date: '[other_date]', following_change: 0 }

Similar behaviour was found for instagram_profile for some ranges. For the following request:
{
    "id" : 1,
    "method" : "socialinsider_api.get_profile_data",
    "params":{
        "id":"nike",
        "profile_type": "instagram_profile",
        "date": {
            "start": 1608209422374,
            "end": 1608300000000,
            "timezone": "Europe/London"
        }
    }
}

The response is: 

{
    "id": 1,
    "error": null,
    "resp": {
        "nike": {
            "17-12-2020": {
                "date": "17-12-2020",
                "likes": 0,
                "comments": 0,
                "followers": 124495434,
                "reach": 0,
                "impressions": 0,
                "engagement": 0,
                "avg_eng_per_post": 0,
                "eng_rate_per_profile": 0,
                "eng_rate_per_post": 0,
                "video_views": 0,
                "posts": 0
            },
            "18-12-2020": {
                "date": "18-12-2020",
                "likes": 0,
                "comments": 0,
                "followers": 124707275,
                "reach": 0,
                "impressions": 0,
                "engagement": 0,
                "followers_net_diff_evolution": 211841,
                "avg_eng_per_post": 0,
                "eng_rate_per_profile": 0,
                "eng_rate_per_post": 0,
                "video_views": 0,
                "posts": 0
            },
            "17-11-2020": {
                "date": "17-11-2020",
                "followers": 124495434
            }
        }
    }
}