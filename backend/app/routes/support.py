from fastapi import APIRouter

router = APIRouter()

@router.get("/faq")
def get_faq():
    return {
        "faqs": [
            {
                "question": "How do I upload player data?",
                "answer": "Go to the Admin page and use the 'Upload Players' button to upload an Excel or CSV file with player information."
            },
            {
                "question": "What columns are required in the player file?",
                "answer": "Required columns: Name, Mobile Number, Player Role. Optional: Photo URL, Stats URL"
            },
            {
                "question": "Can I change team names and budgets?",
                "answer": "Yes, you can edit team names and budgets from the Teams page before the auction starts."
            },
            {
                "question": "How does the undo feature work?",
                "answer": "The undo button reverts the last player sale, restoring the player to unsold status and returning points to the team."
            },
            {
                "question": "How do I download results?",
                "answer": "Visit the Downloads page to export team rosters and unsold players in CSV or view format."
            }
        ]
    }

@router.get("/instructions")
def get_instructions():
    return {
        "admin_instructions": [
            "1. Upload player data using the Admin page",
            "2. Verify all players are loaded correctly",
            "3. Set team names and budgets (optional)",
            "4. Start the auction on the Auction page",
            "5. Download results after auction completion"
        ],
        "team_owner_instructions": [
            "1. Click 'Bid' button to place a bid",
            "2. Adjust bid increment as needed",
            "3. Click 'Sold' when satisfied with bid",
            "4. Track your team's progress on Teams page",
            "5. Use 'Undo' to revert last action if needed"
        ]
    }

@router.get("/help")
def get_help():
    return {
        "message": "For additional help, contact the admin or join the support group",
        "contact": "support@cricketauction.com"
    }

