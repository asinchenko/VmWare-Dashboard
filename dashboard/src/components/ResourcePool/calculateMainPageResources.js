

export function CalculateMainPageResources(
    cpu, ram, ssd, fc, nl,
    cpu_total, ram_total, ssd_total, fc_total, nl_total){
    // [(percentage 1 + percentage 2) / (sample size 1 + sample size 2)] x 100
    ram = ram/1024;
    let cpuPercentage = cpu/cpu_total;
    let ramPercentage = ram/ram_total;
    let ssdPercentage = ssd/ssd_total;
    let fcPercentage = fc/fc_total;
    let nlPercentage = nl/nl_total;
    return ((cpuPercentage+ ramPercentage + ssdPercentage + fcPercentage + nlPercentage)/5*100)
}
