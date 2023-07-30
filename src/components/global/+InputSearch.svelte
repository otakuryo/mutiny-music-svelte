<script>

    let searchText = '';

    function onClickInput() {
        console.log(searchText);
        if (searchText !== '') {
            window.location.href = `/search?query=${searchText}`;
        }
    }

</script>
<div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden transition duration-500">
    <div class="grid place-items-center h-full w-12 text-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
    </div>

    <input
        class="peer h-full w-full outline-none text-sm text-gray-700 pr-2 border-none"
        type="text"
        bind:value={searchText}
        id="search"
        placeholder="Search..."
        autocomplete="off"
    />
</div>