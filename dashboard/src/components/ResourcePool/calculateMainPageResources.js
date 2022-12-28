

export function CalculateMainPageResources(
    cpu, ram, ssd, fc, nl,
    cpu_total, ram_total, ssd_total, fc_total, nl_total){
    // [(percentage 1 + percentage 2) / (sample size 1 + sample size 2)] x 100
    if (cpu, ram, ssd, fc, nl,
        cpu_total, ram_total, ssd_total, fc_total, nl_total){
            ram = ram/1024;
            let cpuPercentage = cpu/cpu_total;
            let ramPercentage = ram/ram_total;
            let storagePercentage = (ssd+fc+nl)/(ssd_total+fc_total+nl_total);
        return (Math.ceil((cpuPercentage+ ramPercentage + storagePercentage)/3*100))
    }else{
        return 0
    }
    
}
