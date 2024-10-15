import './style.css'
function MovieAdd() {
    return (
        <section class="movie-form">
            <h1>Manage Movie</h1>
            <form>
                <div class ="row-one">
                    <div class="form-row">
                        <label for="genre">Genre</label>
                        <select id="genre">
                            <option value="">Select...</option>
                            <option value="Action">Action</option>
                            <option value="Drama">Drama</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Sci-Fi">Sci-Fi</option>
                        </select>
                    </div>
                    <div class="form-row">
                        <label for="title">Title</label>
                        <input type="text" id="title" placeholder="Movie Title" />
                    </div>

                    <div class="form-row">
                        <label for="views">Durations</label>
                        <input type="text" id="views" placeholder="Durations" />
                    </div>
                </div>
                <div class = 'row-two'>
                    <div class="form-row">
                        <label for="views">Seat numbers</label>
                        <input type="number" id="views" placeholder="0" />
                    </div>
                    <div class="form-row">
                        <label for="views">Release</label>
                        <input type="date" id="date" />
                    </div>  
                    <div class="form-row">
                        <label for="poster">Poster Image</label>
                        <input type="file" id="poster" />
                        <small>Size limit: 320x180</small>
                    </div>
                </div>
                <div class="form-row">
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter movie description here"></textarea>
                </div>
                <div class="form-row">
                    <label>Type</label>
                    <div class="radio-group">
                        <label>
                            <input type="radio" name="type" value="Movie" checked /> Movie
                        </label>
                        <label>
                            <input type="radio" name="type" value="Series" /> Series
                        </label>
                    </div>
                </div>
                <div class="form-row actions">
                    <button type="button" class="btn-primary">
                        Save
                    </button>
                    <button type="button" class="btn-secondary">
                        Delete
                    </button>
                </div>
            </form>
        </section>
    );
}
export default MovieAdd