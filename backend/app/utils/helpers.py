"""
Utility helper functions for the application
"""

from datetime import datetime
from typing import Any, Dict, List


def validate_budget(team_budget: int, bid_amount: int) -> bool:
    """
    Validate if team has sufficient budget for a bid
    
    Args:
        team_budget: Current team budget
        bid_amount: Amount to bid
        
    Returns:
        bool: True if budget is sufficient, False otherwise
    """
    return team_budget >= bid_amount


def calculate_total_spent(players: List[Dict]) -> int:
    """
    Calculate total points spent for a team
    
    Args:
        players: List of player dictionaries with points_spent
        
    Returns:
        int: Total points spent
    """
    return sum(player.get('points_spent', 0) for player in players)


def calculate_remaining_budget(initial_budget: int, total_spent: int) -> int:
    """
    Calculate remaining budget
    
    Args:
        initial_budget: Starting budget
        total_spent: Total points spent
        
    Returns:
        int: Remaining budget
    """
    return initial_budget - total_spent


def get_unique_roles(players: List[Dict]) -> List[str]:
    """
    Get unique player roles from a list of players
    
    Args:
        players: List of player dictionaries with role
        
    Returns:
        List[str]: Unique roles
    """
    return list(set(player.get('role', 'Unknown') for player in players))


def format_currency(amount: int) -> str:
    """
    Format currency with commas
    
    Args:
        amount: Amount to format
        
    Returns:
        str: Formatted currency string
    """
    return f"${amount:,}"


def validate_email(email: str) -> bool:
    """
    Simple email validation
    
    Args:
        email: Email address to validate
        
    Returns:
        bool: True if valid email format
    """
    import re
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))


def validate_phone(phone: str) -> bool:
    """
    Validate phone number (10 digits)
    
    Args:
        phone: Phone number to validate
        
    Returns:
        bool: True if valid phone format
    """
    # Remove non-digit characters
    digits_only = ''.join(filter(str.isdigit, phone))
    return len(digits_only) == 10


def get_current_timestamp() -> str:
    """
    Get current timestamp in ISO format
    
    Returns:
        str: Current timestamp
    """
    return datetime.now().isoformat()


def sanitize_filename(filename: str) -> str:
    """
    Sanitize filename to remove invalid characters
    
    Args:
        filename: Original filename
        
    Returns:
        str: Sanitized filename
    """
    import re
    # Remove invalid characters
    sanitized = re.sub(r'[<>:"/\\|?*]', '', filename)
    return sanitized.strip()


def chunk_list(items: List[Any], chunk_size: int) -> List[List[Any]]:
    """
    Split a list into chunks of specified size
    
    Args:
        items: List to chunk
        chunk_size: Size of each chunk
        
    Returns:
        List[List[Any]]: List of chunks
    """
    return [items[i:i + chunk_size] for i in range(0, len(items), chunk_size)]


def safe_divide(numerator: int, denominator: int) -> float:
    """
    Safe division that handles zero denominator
    
    Args:
        numerator: Number to divide
        denominator: Number to divide by
        
    Returns:
        float: Result of division or 0.0
    """
    return numerator / denominator if denominator != 0 else 0.0

