using System;

namespace NetflixTracker.Models
{
    public class Media
    {
        public int Id { get; set; }
        public string Show_Id { get; set; }
        public string Type { get; set; }
        public string Title { get; set; }
        public string Director { get; set; }
        public string Country { get; set; }
        public DateTime Date_Added { get; set; }
        public int Release_Year { get; set; }
        public string Rating { get; set; }
        public string Duration { get; set; }
        public string[] Listed_In { get; set; }
    }
}