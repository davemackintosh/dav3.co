---
title: AWS certificate stuck in pending for subdomain
keywords: 
  - AWS
  - CDK
  - Certificate manager
  - Subdomain
  - Pending
excerpt: Is your AWS certificate manager certificate stuck in pending? I was trying to deploy a certificate for a secondary subdomain and it was stuck in pending but it has a very simple fix.
author: davemackintosh
published: 2024-05-20T17:57:24.394Z
---

<script>
	import Heading from "$src/components/Heading.svelte"
</script>

AWS certificate stuck in pending for subdomain or secondary subdomain?

I was faced with an issue while trying to deploy a certificate for the development area of [Sale Nook](https://sale-nook.com) recently; that my co-founder could access and play with. It wouldn't ever leave the pending state and I checked the rules and the documentation and it all seemed well. 

However, it wasn't. I had to think outside of the box and the issue I was facing was actually a DNS issue. The way my AWS is set up is a different organisational account for each environment to make cost tracking easier and I realised that DNS works in a heirarchy. When you make a request for www.example.com what actually happens is:

1. Asks the com server for the address for example and should get a response of "Ask that guy, he knows" to the "example" server
2. example server gets the request and goes "hey yeah, it's over here" and gives you the IP address for the server.
3. done, you're browsing.

What was actually happening is the hosted zone which my [sale-nook.com](https://sale-nook.com) config is didn't tell the requester where to find my subdomain and I have secondary subdomains to map environment specific servers so the nameservers were never shared.

## The fix

The fix for me was to add a new DNS record to my parent hosted zone, this should be an NS (nameserver) record which has the value of whatever the NS record is for the subdomain's route53 config.

For example:

NS 
ns-238.awsdns-21.com.
ns-1200.awsdns-20.org.
ns-1988.awsdns-52.co.uk.
ns-595.awsdns-6.net.
172800

Now your certificate should validate! Happy days
