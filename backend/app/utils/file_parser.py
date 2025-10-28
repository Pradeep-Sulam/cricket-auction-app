import pandas as pd
import io

async def parse_excel(contents: bytes, filename: str):
    """Parse Excel or CSV file and return list of players"""
    try:
        # Create a BytesIO object from the contents
        file_stream = io.BytesIO(contents)
        
        # Determine file type and read accordingly
        if filename.endswith('.csv'):
            df = pd.read_csv(file_stream)
        else:
            # Excel file
            df = pd.read_excel(file_stream, engine='openpyxl')
        
        # Standardize column names (case insensitive)
        df.columns = df.columns.str.strip().str.lower().str.replace(' ', '_')
        
        # Map possible column name variations
        column_mapping = {
            'player_name': 'name',
            'name': 'name',
            'mobile_number': 'mobile',
            'mobile': 'mobile',
            'phone': 'mobile',
            'player_role': 'role',
            'role': 'role',
            'photo_url': 'photo_url',
            'photo': 'photo_url',
            'picture': 'photo_url',
            'stats_url': 'stats_url',
            'stats': 'stats_url',
            'crichero': 'stats_url'
        }
        
        # Rename columns according to mapping
        df.rename(columns=column_mapping, inplace=True)
        
        # Convert to list of dictionaries
        players = df.to_dict(orient='records')
        
        return players
        
    except Exception as e:
        raise Exception(f"Error parsing file: {str(e)}")