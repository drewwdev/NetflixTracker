using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetflixTracker.Models;

namespace NetflixTracker.Controllers
{
    // All of these routes will be at the base URL:     /api/Media
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case MediaController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class MediaController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public MediaController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Media
        //
        // Returns a list of all your Media
        //
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Media>>> GetMedia()
        {
            // Uses the database context in `_context` to request all of the Media, sort
            // them by row id and return them as a JSON array.
            return await _context.Media.OrderBy(row => row.Id).ToListAsync();
        }

        // GET: api/Media/5
        //
        // Fetches and returns a specific media by finding it by id. The id is specified in the
        // URL. In the sample URL above it is the `5`.  The "{id}" in the [HttpGet("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpGet("{id}")]
        public async Task<ActionResult<Media>> GetMedia(int id)
        {
            // Find the media in the database using `FindAsync` to look it up by id
            var media = await _context.Media.FindAsync(id);

            // If we didn't find anything, we receive a `null` in return
            if (media == null)
            {
                // Return a `404` response to the client indicating we could not find a media with this id
                return NotFound();
            }

            //  Return the media as a JSON object.
            return media;
        }

        // PUT: api/Media/5
        //
        // Update an individual media with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        // In addition the `body` of the request is parsed and then made available to us as a Media
        // variable named media. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Media POCO class. This represents the
        // new values for the record.
        //
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMedia(int id, Media media)
        {
            // If the ID in the URL does not match the ID in the supplied request body, return a bad request
            if (id != media.Id)
            {
                return BadRequest();
            }

            // Tell the database to consider everything in media to be _updated_ values. When
            // the save happens the database will _replace_ the values in the database with the ones from media
            _context.Entry(media).State = EntityState.Modified;

            try
            {
                // Try to save these changes.
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ooops, looks like there was an error, so check to see if the record we were
                // updating no longer exists.
                if (!MediaExists(id))
                {
                    // If the record we tried to update was already deleted by someone else,
                    // return a `404` not found
                    return NotFound();
                }
                else
                {
                    // Otherwise throw the error back, which will cause the request to fail
                    // and generate an error to the client.
                    throw;
                }
            }

            // Return a copy of the updated data
            return Ok(media);
        }

        // POST: api/Media
        //
        // Creates a new media in the database.
        //
        // The `body` of the request is parsed and then made available to us as a Media
        // variable named media. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Media POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        public async Task<ActionResult<Media>> PostMedia(Media media)
        {
            // Indicate to the database context we want to add this new record
            _context.Media.Add(media);
            await _context.SaveChangesAsync();

            // Return a response that indicates the object was created (status code `201`) and some additional
            // headers with details of the newly created object.
            return CreatedAtAction("GetMedia", new { id = media.Id }, media);
        }

        // DELETE: api/Media/5
        //
        // Deletes an individual media with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedia(int id)
        {
            // Find this media by looking for the specific id
            var media = await _context.Media.FindAsync(id);
            if (media == null)
            {
                // There wasn't a media with that id so return a `404` not found
                return NotFound();
            }

            // Tell the database we want to remove this record
            _context.Media.Remove(media);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // Return a copy of the deleted data
            return Ok(media);
        }

        // Private helper method that looks up an existing media by the supplied id
        private bool MediaExists(int id)
        {
            return _context.Media.Any(media => media.Id == id);
        }
    }
}
