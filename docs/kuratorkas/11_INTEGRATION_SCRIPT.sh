#!/bin/bash
# 11_INTEGRATION_SCRIPT.sh
# Deploy/Migrate Automation Script
# KuratorKas × Curator.OS
# Owner: Reza Estes / Haidar — Sovereign AI Dev
# Doctrine: Master-Architect v5.0 CANONICAL | 2026-05-19
# Status: EXECUTE-READY | PUBLIC-SAFE

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}╔════════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║         KURATORKAS × CURATOR.OS - DEPLOY/MIGRATE SCRIPT            ║${NC}"
echo -e "${GREEN}║         Master-Architect v5.0 | 2026-05-19                        ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Check wrangler
    if ! command -v wrangler &> /dev/null; then
        log_error "Wrangler CLI not found. Please install: npm install -g wrangler"
        exit 1
    fi
    
    # Check node
    if ! command -v node &> /dev/null; then
        log_error "Node.js not found. Please install Node.js 18+"
        exit 1
    fi
    
    # Check git
    if ! command -v git &> /dev/null; then
        log_error "Git not found. Please install Git"
        exit 1
    fi
    
    log_info "All prerequisites satisfied"
}

deploy_workers() {
    log_info "Deploying Workers..."
    
    wrangler deploy --env production
    
    log_info "Workers deployed successfully"
}

deploy_pages() {
    log_info "Deploying Pages (Next.js)..."
    
    cd dashboard
    npm install
    npm run build
    wrangler pages deploy dist --project-name kuratorkas-dashboard
    cd ..
    
    log_info "Pages deployed successfully"
}

run_migrations() {
    log_info "Running D1 migrations..."
    
    wrangler d1 migrations apply kuratorkas-prod
    
    log_info "Migrations applied successfully"
}

setup_secrets() {
    log_info "Setting up secrets..."
    
    # Check if secrets are already set
    if ! wrangler secret list | grep -q "JWT_SECRET"; then
        log_warn "JWT_SECRET not set. Please set it:"
        echo "wrangler secret put JWT_SECRET"
    fi
    
    if ! wrangler secret list | grep -q "OPENAI_API_KEY"; then
        log_warn "OPENAI_API_KEY not set. Please set it:"
        echo "wrangler secret put OPENAI_API_KEY"
    fi
    
    log_info "Secrets setup complete"
}

verify_deployment() {
    log_info "Verifying deployment..."
    
    # Check health endpoint
    RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" https://kuratorkas.com/api/health)
    
    if [ "$RESPONSE" -eq 200 ]; then
        log_info "Deployment verified successfully!"
    else
        log_error "Deployment verification failed. HTTP status: $RESPONSE"
        exit 1
    fi
}

migrate_from_fashionkas() {
    log_info "Starting migration from FashionKas..."
    
    # Export FashionKas data
    log_info "Exporting FashionKas data..."
    wrangler d1 export fashionkas-db --output=fashionkas-export.sql
    
    # Transform data
    log_info "Transforming data..."
    node transform-data.js \
        --input=fashionkas-export.sql \
        --output=kuratorkas-import.sql
    
    # Import to KuratorKas
    log_info "Importing to KuratorKas..."
    wrangler d1 import kuratorkas-db --file=kuratorkas-import.sql
    
    # Migrate assets
    log_info "Migrating assets..."
    wrangler r2 migrate \
        --source=fashionkas-assets \
        --target=kuratorkas-assets
    
    log_info "Migration complete!"
}

# Main menu
show_menu() {
    echo ""
    echo "Select an option:"
    echo "1) Deploy to Cloudflare (Workers + Pages)"
    echo "2) Run D1 Migrations"
    echo "3) Setup Secrets"
    echo "4) Verify Deployment"
    echo "5) Migrate from FashionKas"
    echo "6) Full Deploy (All steps)"
    echo "7) Exit"
    echo ""
}

# Main execution
main() {
    check_prerequisites
    
    while true; do
        show_menu
        read -p "Enter your choice: " choice
        
        case $choice in
            1)
                deploy_workers
                deploy_pages
                ;;
            2)
                run_migrations
                ;;
            3)
                setup_secrets
                ;;
            4)
                verify_deployment
                ;;
            5)
                migrate_from_fashionkas
                ;;
            6)
                deploy_workers
                deploy_pages
                run_migrations
                verify_deployment
                ;;
            7)
                log_info "Exiting..."
                exit 0
                ;;
            *)
                log_error "Invalid option"
                ;;
        esac
    done
}

# Run main if executed directly
if [ "${BASH_SOURCE[0]}" == "${0}" ]; then
    main
fi
