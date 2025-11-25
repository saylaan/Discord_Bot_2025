# Get ReKt Discord Bot - Technical Documentation

## Overview

This is a Discord bot designed for the Get ReKt gaming guild to manage personalized feedback channels for roster members. The bot enables staff members to create dedicated, private feedback channels for individual players where officers can provide performance reviews, strategic guidance, and ongoing support. The system facilitates structured communication between leadership and players to optimize team performance.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Application Type
Command-based Discord bot using discord.js v14, running on Node.js 18+. The architecture follows a modular command handler pattern with separation of concerns for permissions, messaging, and command logic.

### Bot Architecture

**Core Framework**: Discord.js v14 with Gateway Intents
- The bot uses specific gateway intents (Guilds, GuildMessages, MessageContent, GuildMembers) to access necessary Discord events
- Single-instance architecture with event-driven message handling
- No database persistence - all state managed through Discord's native channel/role system

**Command System**: Prefix-based command handling
- Commands use the `!` prefix pattern (`!feedback`, `!closefeedback`)
- Role-based access control: Only users with the configured staff role can execute commands
- Inline permission checking before command execution

**Authentication**: Role-based authorization
- Staff role name configured via environment variable (`STAFF_ROLE_NAME`)
- Permission checks occur at two levels: message handler and individual command handlers
- Bot authenticates using Discord token from environment

### Module Organization

**Command Handlers** (`/commands/`)
- `feedback.js`: Creates personalized feedback channels for mentioned users
- `close-feedback.js`: Safely deletes feedback channels with confirmation delay

**Utility Modules** (`/utils/`)
- `permissions.js`: Centralized permission configuration for feedback channels using Discord's PermissionsBitField system

**Message Templates** (`/messages/`)
- `feedback-message.js`: Generates formatted welcome messages with structured guidelines for feedback channels

**Design Rationale**: Modular separation allows for easier testing, maintenance, and future command additions without modifying core bot logic.

### Channel Management

**Feedback Channel Creation**:
- Channels are created with naming convention: `📋・feedback-{player-displayname}`
- Player display names are sanitized (spaces to hyphens, special characters removed)
- Duplicate detection prevents multiple channels for same player
- Channels placed in a specific category defined by `CATEGORY_NAME` environment variable

**Permission Model**:
- Default: Everyone (@everyone) denied view access
- Player: Can view, send messages, and read history
- Staff Role: Full access including message management
- Bot User: Can view, send messages, and read history

**Design Rationale**: Private channels ensure confidential feedback while maintaining transparency between player and staff. Granular permissions prevent unauthorized access while giving staff moderation capabilities.

### Error Handling

**Graceful Degradation**:
- Silent message deletion failures (catch blocks with no action)
- Safe reply mechanism to handle channel send failures
- Console logging for debugging without exposing errors to users
- 5-second delay before channel deletion to allow users to see confirmation

**Design Rationale**: Discord API can be temperamental with permissions and deletions. Silent failures prevent user-facing error spam while console logs preserve debugging information.

### Message Flow

1. User sends `!feedback @player` command
2. Bot validates staff role membership
3. Original command message deleted for cleanliness
4. Bot checks for existing feedback channel
5. Channel created with appropriate permissions in designated category
6. Welcome message sent with formatted guidelines
7. Staff role mentioned to notify available officers

## External Dependencies

### Third-Party Services

**Discord API** (via discord.js v14.18.0)
- Primary integration: All bot functionality depends on Discord's Gateway API
- Real-time event handling through WebSocket connection
- Channel creation, permission management, and message operations via REST API
- No fallback mechanism - Discord availability is critical dependency

**Discord.js Features Used**:
- `Client` with Gateway Intents for event subscription
- `PermissionsBitField` for granular permission management
- Guild/Channel/Role/Member cache for object lookups
- Message creation, deletion, and mention handling

### Configuration Management

**Environment Variables** (via dotenv v16.5.0):
- `DISCORD_TOKEN`: Bot authentication token (required)
- `STAFF_ROLE_NAME`: Name of the role with command permissions (required)
- `CATEGORY_NAME`: Discord category where feedback channels are created (required)

**Design Rationale**: Environment-based configuration allows deployment flexibility and keeps sensitive credentials out of source code. dotenv simplifies local development while supporting production deployment patterns.

### Runtime Dependencies

**Node.js**: Minimum version 18.0.0
- Required for discord.js v14 compatibility
- No specific Node.js features beyond standard library used

**No Database**: State fully managed through Discord
- Feedback channels persist as Discord channels
- Role assignments handled by Discord's native system
- No need for external data persistence layer

**Design Rationale**: Leveraging Discord as the source of truth eliminates database complexity, reduces infrastructure requirements, and ensures data consistency with Discord's state.