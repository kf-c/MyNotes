options for target
- Utilities
    update target before debugging （重新烧录）
- Debug
    load application at startup(调试器（Keil）是否加载 ELF/AXF 的符号信息，一般勾选)  
    settings:Flash Download --Reset and Run(烧录后自动reset)
     
- Target
    use MicoLIB(勾选以避免printf重定向产生的semmihosting重定向问题)