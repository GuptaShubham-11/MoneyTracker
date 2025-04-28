export function getOrCreateOwnerId() {
    // Check if an ID already exists
    let ownerId = localStorage.getItem("ownerId");

    if (!ownerId) {
        // Generate a random ID
        ownerId = crypto.randomUUID();
        localStorage.setItem("ownerId", ownerId);
    }

    return ownerId;
}
